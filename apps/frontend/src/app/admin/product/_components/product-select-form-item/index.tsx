import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@repo/ui/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@repo/ui/components/ui/select';
import { ControllerRenderProps } from 'react-hook-form';

import { adminProductApi } from '@/src/common/store/services/admin/product';

const ProductSelectFormItem = ({
  field,
}: {
  field: ControllerRenderProps<{ productId: string } | any, 'productId'>;
}) => {
  const getBlogCategoriesList = adminProductApi.useGetProductsListQuery(
    undefined,
    {
      refetchOnMountOrArgChange: true,
    },
  );

  return (
    <FormItem>
      <FormLabel>Product</FormLabel>
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <FormControl>
          <SelectTrigger>
            <SelectValue placeholder="Select product" />
          </SelectTrigger>
        </FormControl>
        <SelectContent>
          {getBlogCategoriesList?.data?.data.map((item) => (
            <SelectItem key={item.id} value={item.id}>
              {item.name}
            </SelectItem>
          ))}

          <SelectItem value="m@google.com">m@google.com</SelectItem>
          <SelectItem value="m@support.com">m@support.com</SelectItem>
        </SelectContent>
      </Select>
      <FormMessage />
    </FormItem>
  );
};

export default ProductSelectFormItem;
