import React, { CSSProperties } from 'react';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Button } from '@repo/ui/components/ui/button';
import { Card, CardHeader, CardContent } from '@repo/ui/components/ui/card';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from '@repo/ui/components/ui/form';
import { Input } from '@repo/ui/components/ui/input';
import { ArrowUpDownIcon, TrashIcon } from 'lucide-react';
import {
  Control,
  ControllerRenderProps,
  FieldArrayWithId,
} from 'react-hook-form';

function SortableItem({
  control,
  field,
  item,
  index,
  onClickRemove,
}: {
  control: Control<{
    features: {
      value: string;
    }[];
  }>;
  field: ControllerRenderProps<
    {
      features: {
        value: string;
      }[];
    },
    'features'
  >;
  item: FieldArrayWithId<{
    features: {
      value: string;
    }[];
  }>;
  index: number;
  onClickRemove: () => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1 : 0,
  } as CSSProperties;

  return (
    <Card ref={setNodeRef} style={style}>
      <CardHeader className="flex flex-row space-y-0 justify-between items-center p-1 border-b">
        <Button
          type="button"
          variant={'ghost'}
          size={'sm'}
          {...attributes}
          {...listeners}
        >
          <ArrowUpDownIcon />
        </Button>
        <Button
          type="button"
          variant={'ghost'}
          size={'sm'}
          onClick={onClickRemove}
        >
          <TrashIcon className="text-red-600" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <FormField
          control={control}
          name={`${field.name}.${index}.value`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Feature</FormLabel>
              <FormControl>
                <Input placeholder="value" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

function FeaturesFormField({
  control,
  fields,
  onClickRemove,
  onClickAdd,
  onDragDrop,
}: {
  control: Control<{
    features: {
      value: string;
    }[];
  }>;
  fields: FieldArrayWithId<{
    features: {
      value: string;
    }[];
  }>[];
  onClickRemove: (index: number) => void;
  onClickAdd: () => void;
  onDragDrop: (indexA: number, indexB: number) => void;
}) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const indexA = fields.findIndex((item) => item.id === active!.id);
    const indexB = fields.findIndex((item) => item.id === over!.id);

    onDragDrop(indexA, indexB);
  }

  return (
    <FormField
      control={control}
      name="features"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Features</FormLabel>
          <FormControl>
            <div className="grid gap-2">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={fields}
                  strategy={verticalListSortingStrategy}
                >
                  {fields.map((item, index) => (
                    <SortableItem
                      key={item.id}
                      control={control}
                      field={field}
                      item={item}
                      index={index}
                      onClickRemove={() => onClickRemove(index)}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            </div>
          </FormControl>
          <Button
            type="button"
            size={'sm'}
            className="mt-2 w-full"
            onClick={onClickAdd}
          >
            Add feature
          </Button>
          <FormDescription>
            Add features that this product offers. These will be displayed on
            the checkout page.
          </FormDescription>
        </FormItem>
      )}
    />
  );
}

export default FeaturesFormField;
