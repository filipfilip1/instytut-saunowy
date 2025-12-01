import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Row,
  Column,
  Img,
} from '@react-email/components';
import { BRAND } from '@/constants/brand';
import { capitalizeWords } from '@/lib/utils/text';

interface OrderItem {
  productName: string;
  quantity: number;
  pricePerItem: number;
  variantDisplayNames?: string;
  imageUrl?: string;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const logoSection = {
  textAlign: 'center' as const,
  padding: '32px 0 16px',
};

const logoImage = {
  display: 'block',
  margin: '0 auto',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0',
  padding: '0',
  textAlign: 'center' as const,
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '24px 0 16px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
  padding: '0 32px',
};

const orderSection = {
  backgroundColor: '#f9fafb',
  padding: '24px 32px',
  borderRadius: '8px',
  margin: '32px 16px',
};

const itemRow = {
  borderBottom: '1px solid #e5e7eb',
  padding: '16px 0',
};

const imageColumn = {
  width: '80px',
  paddingRight: '16px',
  verticalAlign: 'top' as const,
};

const productImage = {
  borderRadius: '8px',
  objectFit: 'cover' as const,
};

const detailsColumn = {
  paddingRight: '16px',
  verticalAlign: 'top' as const,
};

const productName = {
  color: '#333',
  fontSize: '15px',
  fontWeight: '600',
  margin: '0 0 4px 0',
  padding: '0',
};

const variantText = {
  color: '#6b7280',
  fontSize: '13px',
  margin: '0',
  padding: '0',
};

const priceColumn = {
  paddingLeft: '8px',
  verticalAlign: 'top' as const,
  width: '100px',
};

const itemText = {
  color: '#333',
  fontSize: '15px',
  fontWeight: '600',
  margin: '0',
  padding: '0',
};

const totalRow = {
  borderTop: '2px solid #333',
  marginTop: '16px',
  paddingTop: '16px',
};

const totalText = {
  color: '#333',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const buttonSection = {
  textAlign: 'center' as const,
  marginTop: '32px',
  padding: '0 32px',
};

const button = {
  backgroundColor: '#98391d',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 24px',
};

const infoSection = {
  padding: '24px 32px',
  margin: '32px 16px',
  borderTop: '1px solid #e5e7eb',
  borderBottom: '1px solid #e5e7eb',
};

const infoTitle = {
  color: '#333',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px 0',
  padding: '0',
};

const infoRow = {
  marginBottom: '8px',
};

const infoBullet = {
  color: '#98391d',
  fontSize: '16px',
  fontWeight: 'bold',
  width: '24px',
  paddingRight: '8px',
  verticalAlign: 'top' as const,
};

const infoText = {
  color: '#4b5563',
  fontSize: '14px',
  margin: '0',
  padding: '0',
  lineHeight: '20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '24px 0',
  textAlign: 'center' as const,
  padding: '0 32px',
};

const link = {
  color: '#98391d',
  textDecoration: 'underline',
};

const socialSection = {
  textAlign: 'center' as const,
  padding: '24px 32px',
  borderTop: '1px solid #e5e7eb',
  marginTop: '32px',
};

const socialText = {
  color: '#8898aa',
  fontSize: '14px',
  margin: '0 0 16px',
};

const socialRow = {
  width: 'auto',
  margin: '0 auto',
  display: 'table',
};

const socialIconColumn = {
  padding: '0 10px',
  width: 'auto',
  display: 'table-cell',
};

const socialIcon = {
  borderRadius: '50%',
  transition: 'opacity 0.3s',
};

export default function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  total,
  trackingNumber,
}: OrderConfirmationEmailProps) {
  const previewText = `Potwierdzenie zamówienia #${orderNumber} 📦`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo Section */}
          <Section style={logoSection}>
            <Img
              src={BRAND.logo.url.email}
              alt={BRAND.logo.alt}
              width={BRAND.logo.dimensions.email.width}
              height={BRAND.logo.dimensions.email.height}
              style={logoImage}
            />
          </Section>

          {/* Heading */}
          <Heading style={h1}>Dziękujemy za zamówienie #{orderNumber}</Heading>

          <Text style={text}>Cześć {capitalizeWords(customerName.split(' ')[0])}!</Text>

          <Text style={text}>
            Twoje zamówienie zostało przyjęte i opłacone. Przygotowujemy je do wysyłki.
          </Text>

          {/* Order items */}
          <Section style={orderSection}>
            <Heading as="h2" style={h2}>
              Zamówione produkty:
            </Heading>

            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                {/* Product Image */}
                <Column style={imageColumn}>
                  {item.imageUrl && (
                    <Img
                      src={item.imageUrl}
                      alt={item.productName}
                      width="60"
                      height="60"
                      style={productImage}
                    />
                  )}
                </Column>

                {/* Product Details */}
                <Column style={detailsColumn}>
                  <Text style={productName}>
                    {item.quantity}x {item.productName}
                  </Text>
                  {item.variantDisplayNames && (
                    <Text style={variantText}>{item.variantDisplayNames}</Text>
                  )}
                </Column>

                {/* Price */}
                <Column align="right" style={priceColumn}>
                  <Text style={itemText}>
                    {(item.pricePerItem * item.quantity).toFixed(2)} zł
                  </Text>
                </Column>
              </Row>
            ))}

            <Row style={totalRow}>
              <Column>
                <Text style={totalText}>Razem:</Text>
              </Column>
              <Column align="right">
                <Text style={totalText}>{total.toFixed(2)} zł</Text>
              </Column>
            </Row>
          </Section>

          {/* Tracking */}
          {trackingNumber && (
            <Section style={buttonSection}>
              <Link
                href={`https://inpost.pl/sledzenie-przesylek?number=${trackingNumber}`}
                style={button}
              >
                Śledź przesyłkę
              </Link>
            </Section>
          )}

          {/* Order Status Info */}
          <Section style={infoSection}>
            <Text style={infoTitle}>Co dalej?</Text>

            <Row style={infoRow}>
              <Column style={infoBullet}>•</Column>
              <Column>
                <Text style={infoText}>Faktura VAT w załączniku</Text>
              </Column>
            </Row>

            <Row style={infoRow}>
              <Column style={infoBullet}>•</Column>
              <Column>
                <Text style={infoText}>Wysyłka: 1-2 dni robocze</Text>
              </Column>
            </Row>

            <Row style={infoRow}>
              <Column style={infoBullet}>•</Column>
              <Column>
                <Text style={infoText}>Płatność potwierdzona</Text>
              </Column>
            </Row>
          </Section>

          {/* Contact */}
          <Text style={footer}>
            Masz pytania? Skontaktuj się z nami:
            <br />
            <Link href={`mailto:${BRAND.contact.email}`} style={link}>
              {BRAND.contact.email}
            </Link>
            <br />
            <Link href={`tel:${BRAND.contact.phone.replace(/\s/g, '')}`} style={link}>
              {BRAND.contact.phone}
            </Link>
          </Text>

          <Text style={footer}>
            Pozdrawiamy serdecznie,
            <br />
            <strong>Zespół Instytutu Saunowego</strong>
          </Text>

          {/* Social Media */}
          <Section style={socialSection}>
            <Text style={socialText}>Dołącz do naszej społeczności</Text>
            <Row style={socialRow}>
              <Column align="center" style={socialIconColumn}>
                <Link href={BRAND.social.facebook.url}>
                  <Img
                    src={BRAND.icons.facebook}
                    alt="Facebook"
                    width="32"
                    height="32"
                    style={socialIcon}
                  />
                </Link>
              </Column>
              <Column align="center" style={socialIconColumn}>
                <Link href={BRAND.social.instagram.url}>
                  <Img
                    src={BRAND.icons.instagram}
                    alt="Instagram"
                    width="32"
                    height="32"
                    style={socialIcon}
                  />
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}
