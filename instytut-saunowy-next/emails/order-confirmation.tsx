import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Text,
  Section,
  Row,
  Column,
} from '@react-email/components';

interface OrderItem {
  productName: string;
  quantity: number;
  pricePerItem: number;
}

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  items: OrderItem[];
  total: number;
  trackingNumber?: string;
}

export default function OrderConfirmationEmail({
  orderNumber,
  customerName,
  items,
  total,
  trackingNumber,
}: OrderConfirmationEmailProps) {
  const previewText = `Potwierdzenie zamówienia #${orderNumber} - Instytut Saunowy`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Logo */}
          <Section style={logoSection}>
            <Img
              src={`${process.env.NEXT_PUBLIC_APP_URL}/logo.png`}
              width="150"
              height="50"
              alt="Instytut Saunowy"
              style={logo}
            />
          </Section>

          {/* Heading */}
          <Heading style={h1}>Dziękujemy za zamówienie! 🎉</Heading>

          <Text style={text}>Cześć {customerName}!</Text>

          <Text style={text}>
            Twoje zamówienie <strong>#{orderNumber}</strong> zostało przyjęte i opłacone.
            Przygotowujemy je do wysyłki.
          </Text>

          {/* Order items */}
          <Section style={orderSection}>
            <Heading as="h2" style={h2}>
              Zamówione produkty:
            </Heading>

            {items.map((item, index) => (
              <Row key={index} style={itemRow}>
                <Column style={itemColumn}>
                  <Text style={itemText}>
                    {item.quantity}x {item.productName}
                  </Text>
                </Column>
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

          {/* Footer info */}
          <Section style={infoSection}>
            <Text style={infoText}>
              ✅ Faktura VAT została dołączona do tej wiadomości
            </Text>
            <Text style={infoText}>
              📦 Wysyłka nastąpi w ciągu 1-2 dni roboczych
            </Text>
            <Text style={infoText}>
              💳 Płatność została potwierdzona
            </Text>
          </Section>

          {/* Contact */}
          <Text style={footer}>
            Masz pytania? Skontaktuj się z nami:
            <br />
            📧{' '}
            <Link href="mailto:kontakt@instytut-saunowy.pl" style={link}>
              kontakt@instytut-saunowy.pl
            </Link>
            <br />
            📱 +48 123 456 789
          </Text>

          <Text style={footer}>
            Pozdrawiamy serdecznie,
            <br />
            <strong>Zespół Instytutu Saunowego</strong> 🧖‍♀️
          </Text>

          {/* Social */}
          <Section style={socialSection}>
            <Text style={socialText}>Śledź nas:</Text>
            <Row>
              <Column align="center">
                <Link href="https://facebook.com/instytut.saunowy" style={socialLink}>
                  Facebook
                </Link>
              </Column>
              <Column align="center">
                <Link href="https://instagram.com/instytut_saunowy" style={socialLink}>
                  Instagram
                </Link>
              </Column>
            </Row>
          </Section>
        </Container>
      </Body>
    </Html>
  );
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
  padding: '32px 0',
};

const logo = {
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
  padding: '12px 0',
};

const itemColumn = {
  paddingRight: '8px',
};

const priceColumn = {
  paddingLeft: '8px',
};

const itemText = {
  color: '#333',
  fontSize: '14px',
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
  fontSize: '18px',
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
  backgroundColor: '#f0f9ff',
  padding: '20px 32px',
  margin: '32px 16px',
  borderRadius: '8px',
  borderLeft: '4px solid #3b82f6',
};

const infoText = {
  color: '#1e40af',
  fontSize: '14px',
  margin: '8px 0',
  padding: '0',
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
  marginTop: '32px',
  paddingTop: '32px',
  borderTop: '1px solid #e5e7eb',
};

const socialText = {
  color: '#6b7280',
  fontSize: '14px',
  marginBottom: '12px',
};

const socialLink = {
  color: '#98391d',
  fontSize: '14px',
  textDecoration: 'none',
  fontWeight: '500',
  padding: '0 12px',
};
