import { renderToBuffer } from "@react-pdf/renderer";
import { ReceiptDocument } from "./receipt-document";
import type { OrderWithItems } from "@/lib/store/order-types";

export async function generateReceiptPdfBuffer(order: OrderWithItems): Promise<Buffer> {
  return renderToBuffer(<ReceiptDocument order={order} />);
}
