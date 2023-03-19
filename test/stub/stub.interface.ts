// T = Class
// K = Class abstact data type that want to remove
export type Stub<T, K extends keyof any = ""> = Record<
  keyof Omit<T, K>,
  jest.Mock<any, any>
>;
