import { config } from 'dotenv';
config();
import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import { Order, OrderItems } from '@/types';
import sampleData from '@/sample-data';

PurchaseReceiptEmail.PreviewProps = {
  order: {
    id: crypto.randomUUID(),
    userId: '123',
    user: {
      name: 'John Doe',
      email: 'test@test.com',
    },
    paymentMethod: 'Stripe',
    shippingAddress: {
      fullName: 'John Doe',
      streetAddress: '123 Main st',
      city: 'Abu Dhabi',
      phoneNumber: ' +1234567890',
    },
    createdAt: new Date(),
    totalPrice: '100',
    taxPrice: '10',
    shippingPrice: '10',
    itemsPrice: '80',
    orderItems: sampleData.products.map((x) => ({
      name: x.name,
      orderId: '123',
      productId: '123',
      slug: x.slug,
      qty: x.stock,
      image: x.images[0],
      price: x.price.toString(),
    })),
    isDelivered: true,
    deliveredAt: new Date(),
    isPaid: true,
    paidAt: new Date(),
  },
};

const dateFormatter = new Intl.DateTimeFormat('en', { dateStyle: 'medium' });

type OrderInformationProps = {
  order: {
    id: string;
    totalPrice: string;
    itemsPrice: string;
    taxPrice: string;
    shippingPrice: string;
    createdAt: Date;
    orderItems: OrderItems[];
  };
};

export default function PurchaseReceiptEmail({ order }: OrderInformationProps) {
  const baseUrl =
    process.env.NODE_ENV === 'production'
      ? `${process.env.NEXT_PUBLIC_PROD_URL}/images`
      : '/static';

  return (
    <Html>
      <Preview>View order receipt</Preview>
      <Tailwind>
        <Head />
        <Body className='font-sans bg-white'>
          <Container className='max-w-xl'>
            <Section>
              <Img
                src={`${baseUrl}/logo.png`}
                width='50'
                height='50'
                alt='Bayro'
                className='mx-auto mt-4'
              />
            </Section>
            <Heading>Purchase Receipt</Heading>
            <Section>
              <Row>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Order ID
                  </Text>
                  <Text className='mt-0 mr-4'>{order.id.toString()}</Text>
                </Column>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Purchase Date
                  </Text>
                  <Text className='mt-0 mr-4'>
                    {dateFormatter.format(order.createdAt)}
                  </Text>
                </Column>
                <Column>
                  <Text className='mb-0 mr-4 text-gray-500 whitespace-nowrap text-nowrap'>
                    Price Paid
                  </Text>
                  <Text className='mt-0 mr-4'>{`AED ${order.totalPrice}`}</Text>
                </Column>
              </Row>
            </Section>
            <Section className='border border-solid  border-gray-300 rounded-lg p-4 md:p-6 my-4'>
              {order.orderItems.map((item) => (
                <Row key={item.productId} className='mt-4 mb-4'>
                  <Column className='w-20 align-top'>
                    <Img
                      width='80'
                      alt={item.name}
                      className='rounded'
                      src={item.image}
                    />
                  </Column>
                  <Column
                    className='pl-4 align-top w-34 md:w-52'
                    style={{ paddingLeft: '16px' }}
                  >
                    <Text className='m-0 font-medium'>{item.name}</Text>
                  </Column>
                  <Column align='right' className='align-top'>
                    <Text className='m-0 font-bold'>{`AED ${item.price}`}</Text>
                    <Text className='m-0 text-gray-600'>Qty: {item.qty}</Text>
                  </Column>
                </Row>
              ))}
              {[
                { name: 'Items', price: `AED ${order.itemsPrice}` },
                { name: 'Tax', price: `AED ${order.taxPrice}` },
                { name: 'Shipping', price: `AED ${order.shippingPrice}` },
                { name: 'Total', price: `AED ${order.totalPrice}` },
              ].map(({ name, price }) => (
                <Row key={name} className='py-1'>
                  <Column align='right' className='text-sm'>
                    {name}:{' '}
                  </Column>
                  <Column align='right' width={70} className='align-top'>
                    <Text className='m-0 text-xs'>{price}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
