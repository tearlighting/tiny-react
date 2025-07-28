export const enum EFiberFlags {
  /**
   * 不需要任何操作
   */
  NoFlags = 0b0000000000000000000000000000000,
  /**
   * 需要插入,新增，移动
   */
  Placement = 0b0000000000000000000000000000010,
  /**
   * 需要更新属性
   */

  Update = 0b0000000000000000000000000000100,
  /**
   * 需要删除节点
   */
  Deletion = 0b0000000000000000000000000001000,
  /**
   * 需要更新Ref
   */
  Ref = 0b0000000000000000000001000,
}

export const enum EFiberTags {
  FunctionComponent = 0,
  ClassComponent = 1,
  HostComponent = 5,
  HostText = 6,
  Fragment = 7,
  HostRoot = 3,
}

export const enum EClassComponent {
  isReactComponent = "isReactComponent",
}

export const enum EPriorityLevel {
  Immediate = -1, // 最高优先级
  UserBlocking = 20,
  Normal = 100,
  Low = 300,
  Idle = 500,
}
