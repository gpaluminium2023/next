import { Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";
import { format } from "date-fns";
import type { OrderWithItems } from "@/lib/store/order-types";
import type { CalculatorDetailsSnapshot } from "@/lib/roof-calculator/calculator-details";
import { LOGO_PNG_BASE64 } from "./logo-base64";

// The PDF's base "Helvetica" font only supports WinAnsi/Latin-1 — the ₦ sign
// (U+20A6) and → arrow (U+2192) fall outside that range and render as garbage
// glyphs, unlike in HTML (browser/email) where formatNaira's "₦" is fine.
function formatNairaPdf(kobo: number): string {
  const naira = kobo / 100;
  return `NGN ${naira.toLocaleString("en-NG", {
    minimumFractionDigits: naira % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  })}`;
}

const styles = StyleSheet.create({
  page: { padding: 36, fontSize: 10, fontFamily: "Helvetica", color: "#1c2b3a" },
  header: { flexDirection: "row", alignItems: "center", marginBottom: 16 },
  logo: { width: 40, height: 40, marginRight: 10 },
  brand: { fontSize: 16, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  brandSub: { fontSize: 9, color: "#5a6b7a" },
  title: { fontSize: 13, fontFamily: "Helvetica-Bold", marginBottom: 2 },
  meta: { fontSize: 9, color: "#5a6b7a", marginBottom: 16 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    textTransform: "uppercase",
    color: "#5a6b7a",
    marginBottom: 4,
    marginTop: 14,
  },
  row: { flexDirection: "row", justifyContent: "space-between", marginBottom: 3 },
  label: { color: "#5a6b7a" },
  value: { fontFamily: "Helvetica-Bold" },
  hr: { borderBottomWidth: 1, borderBottomColor: "#d8dde1", marginVertical: 8 },
  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#1c2b3a",
    paddingBottom: 4,
    marginBottom: 4,
  },
  tableRow: { flexDirection: "row", paddingVertical: 3 },
  colItem: { flex: 5 },
  colQty: { flex: 2, textAlign: "right" },
  colTotal: { flex: 2, textAlign: "right" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: "#1c2b3a" },
  totalLabel: { fontFamily: "Helvetica-Bold" },
  totalValue: { fontFamily: "Helvetica-Bold", fontSize: 12 },
  footer: { position: "absolute", bottom: 30, left: 36, right: 36, fontSize: 8, color: "#8a97a2", textAlign: "center" },
});

export function ReceiptDocument({ order }: { order: OrderWithItems }) {
  const isCalculator = order.source === "ROOF_CALCULATOR";
  const title = isCalculator ? "Roof Sheet Estimate" : "Payment Receipt";
  const calc = (order.calculatorDetails as CalculatorDetailsSnapshot | null) ?? null;

  return (
    <Document title={`${title} ${order.reference}`}>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Image style={styles.logo} src={LOGO_PNG_BASE64} />
          <View>
            <Text style={styles.brand}>Gods Promise Aluminium Concept Limited</Text>
            <Text style={styles.brandSub}>Pleasure Bus Stop, Alimosho, Lagos, Nigeria · +234 915 045 9964</Text>
          </View>
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.meta}>
          Reference {order.reference} · {format(order.createdAt, "d MMM yyyy, HH:mm")}
        </Text>

        <Text style={styles.sectionTitle}>Customer</Text>
        <View style={styles.row}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>{order.customerName}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{order.customerEmail}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{order.customerPhone}</Text>
        </View>
        {order.deliveryAddress && (
          <View style={styles.row}>
            <Text style={styles.label}>Delivery address</Text>
            <Text style={styles.value}>{order.deliveryAddress}</Text>
          </View>
        )}

        <Text style={styles.sectionTitle}>{isCalculator ? "Estimate" : "Order"}</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.colItem, styles.label]}>Item</Text>
          <Text style={[styles.colQty, styles.label]}>Qty</Text>
          <Text style={[styles.colTotal, styles.label]}>Amount</Text>
        </View>
        {order.items.map((item) => (
          <View key={item.id} style={styles.tableRow}>
            <Text style={styles.colItem}>
              {item.nameSnapshot}
              {item.variantSnapshot ? ` (${item.variantSnapshot})` : ""}
            </Text>
            <Text style={styles.colQty}>
              {item.quantity} {item.unit}
            </Text>
            <Text style={styles.colTotal}>{formatNairaPdf(item.lineTotalKobo)}</Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>{isCalculator ? "Estimated total" : "Total paid"}</Text>
          <Text style={styles.totalValue}>{formatNairaPdf(order.subtotalKobo)}</Text>
        </View>

        {calc && (
          <>
            <Text style={styles.sectionTitle}>Calculator breakdown</Text>
            <View style={styles.row}>
              <Text style={styles.label}>Roof shape</Text>
              <Text style={styles.value}>{calc.shape}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Pitch</Text>
              <Text style={styles.value}>{calc.pitchDeg}°</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Roof area (with waste)</Text>
              <Text style={styles.value}>{calc.roofAreaWithWaste.toFixed(2)} m²</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.label}>Sheets needed</Text>
              <Text style={styles.value}>{calc.sheetsCount}</Text>
            </View>
            {calc.totalLinearMeters != null && (
              <View style={styles.row}>
                <Text style={styles.label}>Total linear metres</Text>
                <Text style={styles.value}>{calc.totalLinearMeters.toFixed(2)} m</Text>
              </View>
            )}
            <View style={styles.row}>
              <Text style={styles.label}>Approx. fasteners</Text>
              <Text style={styles.value}>{calc.fasteners}</Text>
            </View>
            {calc.accessories
              .filter((a) => a.length > 0)
              .map((a) => (
                <View key={a.label} style={styles.row}>
                  <Text style={styles.label}>{a.label}</Text>
                  <Text style={styles.value}>
                    {a.length.toFixed(2)} m {"->"} {a.pieces} pc
                  </Text>
                </View>
              ))}
          </>
        )}

        <Text style={styles.footer}>
          {isCalculator
            ? "This is a working estimate based on customer-supplied measurements, not a final invoice."
            : "Delivery is quoted separately and is not included in the amount above."}
        </Text>
      </Page>
    </Document>
  );
}
