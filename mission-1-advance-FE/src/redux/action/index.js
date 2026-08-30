export const ADD_ORDER = "ADD_ORDER";
export const UPDATE_ORDER_STATUS = "UPDATE_ORDER_STATUS";
export const ENROLL_COURSE = "ENROLL_COURSE";
export const TOOGLE_ITEM_COMPLETE = "TOOGLE_ITEM_COMPLETE";

export function addOrder(order) {
  return {
    type: ADD_ORDER,
    payload: order,
  };
}

export function updateOrderStatus(orderId, status) {
  return {
    type: UPDATE_ORDER_STATUS,
    payload: { orderId, status },
  };
}

export function enrollCourse(courseId) {
  return {
    type: ENROLL_COURSE,
    payload: { courseId },
  };
}

export function toogleItemComplete(courseId, itemKey) {
  return {
    type: TOOGLE_ITEM_COMPLETE,
    payload: { courseId, itemKey },
  };
}
