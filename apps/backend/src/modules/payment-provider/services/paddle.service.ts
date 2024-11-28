import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  AdjustmentNotification,
  EventEntity,
  EventName,
  SubscriptionCreatedNotification,
  SubscriptionNotification,
  TransactionNotification,
} from '@paddle/paddle-node-sdk';
import { PaymentProvider, Prisma } from '@repo/database/index';
import { IEnvConfig } from 'src/config/configuration';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class PaddlePaymentProviderService {
  constructor(
    private readonly configService: ConfigService<IEnvConfig>,
    private readonly prisma: PrismaService,
  ) {}

  async webhook(eventEntity: EventEntity) {
    try {
      switch (eventEntity.eventType) {
        case EventName.SubscriptionCreated:
        case EventName.SubscriptionTrialing:
        case EventName.SubscriptionActivated:
        case EventName.SubscriptionUpdated:
        case EventName.SubscriptionPaused:
        case EventName.SubscriptionResumed:
        case EventName.SubscriptionCanceled:
        case EventName.SubscriptionPastDue:
          await this.upsertSubscription(eventEntity.data);
          break;
        case EventName.TransactionCreated:
        case EventName.TransactionUpdated:
        case EventName.TransactionCompleted:
        case EventName.TransactionBilled:
        case EventName.TransactionPaid:
        case EventName.TransactionCanceled:
        case EventName.TransactionPastDue:
        case EventName.TransactionPaymentFailed:
        case EventName.TransactionReady:
          await this.upsertTransaction(eventEntity.data);
          break;
        case EventName.AdjustmentCreated:
        case EventName.AdjustmentUpdated:
          await this.upsertAdjustment(eventEntity.data);
          break;
      }
      return {
        success: true,
      };
    } catch (error) {
      throw new BadRequestException((error as any)?.message);
    }
  }

  private async upsertSubscription(
    data: SubscriptionNotification | SubscriptionCreatedNotification,
  ) {
    return this.prisma.subscription.upsert({
      where: {
        providerSubscriptionId: data.id,
      },
      create: {
        providerSubscriptionId: data.id,
        provider: PaymentProvider.paddle,
        status: data.status,
        transactionId:
          (data as SubscriptionCreatedNotification)?.transactionId || null,
        customerId: data.customerId,
        addressId: data.addressId,
        businessId: data?.businessId || null,
        currencyCode: data.currencyCode,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        startedAt: data?.startedAt || null,
        firstBilledAt: data?.firstBilledAt || null,
        nextBilledAt: data?.nextBilledAt || null,
        pausedAt: data?.pausedAt || null,
        canceledAt: data.canceledAt,
        discount: (data?.discount as any) ?? Prisma.JsonNull,
        collectionMode: data.collectionMode,
        billingDetails: (data?.billingDetails as any) ?? Prisma.JsonNull,
        currentBillingPeriod:
          (data?.currentBillingPeriod as any) ?? Prisma.JsonNull,
        billingCycle: { ...data.billingCycle },
        scheduledChange: (data?.scheduledChange as any) ?? Prisma.JsonNull,
        items: data.items as [],
        customData: (data?.customData as any) ?? Prisma.JsonNull,
        importMeta: (data?.importMeta as any) ?? Prisma.JsonNull,
      },
      update: {
        status: data.status,
        customerId: data.customerId,
        addressId: data.addressId,
        businessId: data?.businessId || null,
        currencyCode: data.currencyCode,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
        startedAt: data?.startedAt || null,
        firstBilledAt: data?.firstBilledAt || null,
        nextBilledAt: data?.nextBilledAt || null,
        pausedAt: data?.pausedAt || null,
        canceledAt: data.canceledAt,
        discount: (data?.discount as any) ?? Prisma.JsonNull,
        collectionMode: data.collectionMode,
        billingDetails: (data?.billingDetails as any) ?? Prisma.JsonNull,
        currentBillingPeriod:
          (data?.currentBillingPeriod as any) ?? Prisma.JsonNull,
        billingCycle: { ...data.billingCycle },
        scheduledChange: (data?.scheduledChange as any) ?? Prisma.JsonNull,
        items: data.items as [],
        customData: (data?.customData as any) ?? Prisma.JsonNull,
        importMeta: (data?.importMeta as any) ?? Prisma.JsonNull,
      },
    });
  }

  private async upsertTransaction(data: TransactionNotification) {
    return this.prisma.transaction.upsert({
      where: {
        providerTransactionId: data.id,
      },
      create: {
        providerTransactionId: data.id,
        provider: PaymentProvider.paddle,
        status: data.status,
        customerId: data?.customerId,
        addressId: data?.addressId,
        businessId: data?.businessId || null,
        customData: (data?.customData as any) ?? Prisma.JsonNull,
        currencyCode: data.currencyCode,
        origin: data.origin,
        subscriptionId: data?.subscriptionId || null,
        invoiceId: data?.invoiceId || null,
        invoiceNumber: data?.invoiceNumber || null,
        collectionMode: data.collectionMode,
        discountId: data?.discountId || null,
        billingDetails: (data?.billingDetails as any) ?? Prisma.JsonNull,
        billingPeriod: (data?.billingPeriod as any) ?? Prisma.JsonNull,
        items: data.items as [],
        details: (data?.details as any) ?? Prisma.JsonNull,
        payments: (data?.payments as any) ?? Prisma.JsonNull,
        checkout: (data?.checkout as any) ?? Prisma.JsonNull,
        createdAt: data?.createdAt || null,
        updatedAt: data?.updatedAt || null,
        billedAt: data?.billedAt || null,
      },
      update: {
        status: data.status,
        customerId: data?.customerId,
        addressId: data?.addressId,
        businessId: data?.businessId || null,
        customData: (data?.customData as any) ?? Prisma.JsonNull,
        currencyCode: data.currencyCode,
        origin: data.origin,
        subscriptionId: data?.subscriptionId || null,
        invoiceId: data?.invoiceId || null,
        invoiceNumber: data?.invoiceNumber || null,
        collectionMode: data.collectionMode,
        discountId: data?.discountId || null,
        billingDetails: (data?.billingDetails as any) ?? Prisma.JsonNull,
        billingPeriod: (data?.billingPeriod as any) ?? Prisma.JsonNull,
        items: data.items as [],
        details: (data?.details as any) ?? Prisma.JsonNull,
        payments: (data?.payments as any) ?? Prisma.JsonNull,
        checkout: (data?.checkout as any) ?? Prisma.JsonNull,
        createdAt: data?.createdAt || null,
        updatedAt: data?.updatedAt || null,
        billedAt: data?.billedAt || null,
      },
    });
  }

  private async upsertAdjustment(data: AdjustmentNotification) {
    return this.prisma.adjustment.upsert({
      where: {
        providerAdjustmentId: data.id,
      },
      create: {
        providerAdjustmentId: data.id,
        provider: PaymentProvider.paddle,
        action: data.action,
        transactionId: data.transactionId,
        subscriptionId: data?.subscriptionId || null,
        customerId: data?.customerId,
        reason: data.reason,
        creditAppliedToBalance: data.creditAppliedToBalance,
        currencyCode: data.currencyCode,
        status: data.status,
        items: data.items as [],
        totals: data.totals as object,
        payoutTotals: (data?.payoutTotals as any) ?? Prisma.JsonNull,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
      update: {
        action: data.action,
        transactionId: data.transactionId,
        subscriptionId: data?.subscriptionId || null,
        customerId: data?.customerId,
        reason: data.reason,
        creditAppliedToBalance: data.creditAppliedToBalance,
        currencyCode: data.currencyCode,
        status: data.status,
        items: data.items as [],
        totals: data.totals as object,
        payoutTotals: (data?.payoutTotals as any) ?? Prisma.JsonNull,
        createdAt: data.createdAt,
        updatedAt: data.updatedAt,
      },
    });
  }
}
