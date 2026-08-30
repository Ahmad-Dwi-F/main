import { ADMIN_FEE } from "../data/constants";
import { findPaymentMethod } from "../data/paymentMethods";

export function createOrder(course, methodId, status) {
  const method = findPaymentMethod(methodId);
  const now = new Date();

  return {
    orderId: `ORD-${now.getTime()}`,
    invoice: `HEL/VI/${now.getTime().toString().slice(-8)}`,
    courseId: course.id,
    title: course.title,
    image: course.image,
    price: course.price,
    total: course.price + ADMIN_FEE,
    methodId: method?.id ?? "kartu",
    methodLabel: method?.label ?? "Kartu Kredit/Debit",
    paymentTime: now.toISOString(),
    status,
  };
}
