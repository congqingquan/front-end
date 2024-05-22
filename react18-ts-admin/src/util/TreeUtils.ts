type Consumer<T> = (t: T) => void
type Function<T, U> = (t: T) => U

/**
 * Foreach nodes
 * @param nodes 
 * @param getChildren 
 * @param action 
 * @returns 
 */
type ForEachNode = <T, K extends keyof T> (
    nodes: T[],
    childrenKey: T[K] extends T[] ? K : never,
    action: Consumer<T>
) => void

const forEachNode: ForEachNode = (nodes, childrenKey, action) => {

    if (!nodes || nodes.length <= 0) {
        return;
    }
    for (let node of nodes) {
        action(node);
        let childNodes = node[childrenKey];
        if (Array.isArray(childNodes) && childNodes.length > 0) {
            nodes.push(...childNodes);
        }
    }
}

/**
 * Convert nodes
 * @param nodes 
 * @param getChildren 
 * @param action 
 * @returns 
 */
const convertNode = <T, U>(
    nodes: T[],
    map: Function<T, U>,
    getSourceNodeChildren: Function<T, T[]>,
    initTargetNodeChildren: Function<U, U[]>
): U[] => {

    if (!nodes || nodes.length <= 0) {
        return [];
    }

    const targetNodes: U[] = [];

    for (let sourceNode of nodes) {
        targetNodes.push(
            convertNodeRecursion(sourceNode, map, getSourceNodeChildren, initTargetNodeChildren)
        )
    }
    return targetNodes;
}

const convertNodeRecursion = <T, U>(
    sourceNode: T,
    map: Function<T, U>,
    getSourceNodeChildren: Function<T, T[]>,
    initTargetNodeChildren: Function<U, U[]>
): U => {

    const targetNode: U = map(sourceNode);

    let sourceNodeChildren = getSourceNodeChildren(sourceNode);
    if (!sourceNodeChildren) {
        return targetNode;
    }

    const targetNodeChildren = initTargetNodeChildren(targetNode);
    for (const sourceNodeChild of sourceNodeChildren) {
        targetNodeChildren.push(
            convertNodeRecursion(sourceNodeChild, map, getSourceNodeChildren, initTargetNodeChildren)
        );
    }
    return targetNode;
}

export {
    forEachNode, convertNode
}