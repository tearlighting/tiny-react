//堆
interface IHeap<T> {
  size: number
  peek: T | undefined
  insert(payload: T): void
  //删除堆顶元素并返回
  extractTop(): T | undefined
}

//额外能力，如果以后需要使用plugin啥的，自己扩展去
interface IInjectable<T> {
  injectHeap(payload: T[]): void
}

export class Heap<T> implements IHeap<T>, IInjectable<T> {
  protected _heap: T[] = []
  constructor(private _compare: (a: T, b: T) => boolean) {}
  injectHeap(payload: T[]): void {
    this._heap = payload
    //只需要操作一半即可
    for (let i = Math.floor(this._heap.length / 2); i >= 0; i--) {
      Heap.sinkDown(this._heap, this._compare, i)
    }
  }
  get size(): number {
    return this._heap.length
  }
  get peek(): T {
    return this._heap[0]
  }
  insert(payload: T): void {
    this._heap.push(payload)
    //往堆中添加元素，为保证完全二叉树，会把新元素放到最后一个节点，然后进行上浮操作
    Heap.bubbleUp(this._heap, this._compare)
  }
  extractTop(): T | undefined {
    const top = this._heap[0]
    const end = this._heap.pop()
    if (end && this._heap.length) {
      this._heap[0] = end
      //拿走根节点后，为保证完全二叉树，会吧最后一个节点放到根节点，然后进行下沉操作
      Heap.sinkDown(this._heap, this._compare)
    }
    return top
  }
  static sinkDown = sinkDownDfs
  static bubbleUp = bubbleUpDfs
}

function swap<T>(heap: T[], i: number, j: number): void {
  ;[heap[i], heap[j]] = [heap[j], heap[i]]
}
function sinkDownDfs<T>(heap: T[], compare: (a: T, b: T) => boolean, index: number = 0): void {
  if (index > heap.length - 1 || index < 0) return
  let left = 2 * index + 1
  let right = 2 * index + 2
  let largest = index
  if (left < heap.length && compare(heap[largest], heap[left])) {
    largest = left
  }
  if (right < heap.length && compare(heap[largest], heap[right])) {
    largest = right
  }
  if (largest !== index) {
    swap(heap, index, largest)
    sinkDownDfs(heap, compare, largest)
  }
}

function bubbleUpDfs<T>(heap: T[], compare: (a: T, b: T) => boolean, index: number = heap.length - 1): void {
  if (index > heap.length - 1 || index < 0) return
  const parent = Math.floor((index - 1) / 2)
  if (index > 0 && compare(heap[parent], heap[index])) {
    swap(heap, index, parent)
    bubbleUpDfs(heap, compare, parent)
  }
}

export function createHeap<T>(comparator: (a: T, b: T) => boolean): Heap<T> {
  return new Heap<T>(comparator)
}
