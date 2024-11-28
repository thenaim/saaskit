declare global {
  namespace PrismaJson {
    type ProductMetadataType = { key: string; value: string }[];
    type ProductFeaturesType = { value: string }[];
  }
}
