import { Function, BiPredicate, BiConsumer } from "./Functions";
import * as ArrayUtils from "./ArrayUtils";

// ====================================== Generate ======================================

/**
 * 树节点类型转换
 *
 * @param sourceNodes                 源节点集合
 * @param mapping                     类型转换过程
 * @param sourceNodeChildrenExtractor 源节点子节点列表提取器
 * @param initTargetNodeChildren      初始、返回目标节点的子节点容器
 * @param container                   目标列表容器
 */
function convertNode<T, U>(
    sourceNodes: T[],
    mapping: Function<T, U>,
    sourceNodeChildrenExtractor: Function<T, T[]>,
    initTargetNodeChildren: Function<U, U[]>
): U[] {

    if (!sourceNodes || sourceNodes.length <= 0) {
        return [];
    }

    const targetNodes: U[] = [];

    for (let sourceNode of sourceNodes) {
        targetNodes.push(
            convertNodeRecursion(sourceNode, mapping, sourceNodeChildrenExtractor, initTargetNodeChildren)
        )
    }
    return targetNodes;
}

function convertNodeRecursion<T, U>(
    sourceNode: T,
    mapping: Function<T, U>,
    sourceNodeChildrenExtractor: Function<T, T[]>,
    initTargetNodeChildren: Function<U, U[]>
): U {

    const targetNode: U = mapping(sourceNode);

    let sourceNodeChildren = sourceNodeChildrenExtractor(sourceNode);
    if (!sourceNodeChildren) {
        return targetNode;
    }

    const targetNodeChildren = initTargetNodeChildren(targetNode);
    for (const sourceNodeChild of sourceNodeChildren) {
        targetNodeChildren.push(
            convertNodeRecursion(sourceNodeChild, mapping, sourceNodeChildrenExtractor, initTargetNodeChildren)
        );
    }
    return targetNode;
}

// ====================================== Search ======================================

/**
 * 搜索节点
 *
 * @param nodes             节点列表
 * @param childrenExtractor children 提取器
 * @param predicate         断言节点
 */
function searchNode<T>(
    nodes: T[], 
    childrenExtractor: Function<T, T[]>, 
    predicate: BiPredicate<T[], T>
): T | null {
    let res: T | null = null;
    breakableForeach(nodes, childrenExtractor, (pathNodes, node) => {
        const test = predicate(pathNodes, node);
        if (test) {
            res = node;
        }
        return test;
    });
    return res;
}

/**
 * 迭代
 *
 * @param nodes             节点列表
 * @param childrenExtractor children 提取器
 * @param consumer          消费节点
 */
function foreach<T>(
    nodes: T[], 
    childrenExtractor: Function<T, T[]>, 
    consumer: BiConsumer<T[], T>
): void {
    breakableForeach(nodes, childrenExtractor, (pathNodes, node) => {
        consumer(pathNodes, node);
        return false;
    });
}

/**
* 可中断的迭代(当 consumer 返回 true 时终止迭代)
*
* @param nodes             节点列表
* @param childrenExtractor children 提取器
* @param consumer          终止断言
*/
function breakableForeach<T>(
    nodes: T[],
    childrenExtractor: Function<T, T[]>,
    consumer: BiPredicate<T[], T>
): void {
    if (ArrayUtils.isEmpty(nodes)) {
        return;
    }
    for (const node of nodes) {
        if (breakableForeachRecursion(node, [], childrenExtractor, consumer)) {
            return;
        }
    }
}

function breakableForeachRecursion<T>(
    node: T,
    pathNodes: T[],
    childrenExtractor: Function<T, T[]>,
    consumer: BiPredicate<T[], T>
): boolean {
    if (consumer(pathNodes, node)) {
        return true;
    }

    const children = childrenExtractor(node);
    if (ArrayUtils.isEmpty(children)) {
        return false;
    }

    pathNodes.push(node);
    for (const child of children) {
        if (breakableForeachRecursion(child, pathNodes, childrenExtractor, consumer)) {
            return true;
        }
    }

    return false;
}

export {
    convertNode, searchNode, foreach, breakableForeach
}