class Node {
    constructor(value, left = null, right = null) {
        this.value = value;
        this.left = left;
        this.right = right;
    }
}

class Tree {
    constructor(array) {
        // sort array
        array.sort((a, b) => a - b);

        // remove duplicates
        let lastNum = undefined;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === lastNum) {
                array.splice(i, 1);
                i--;
            } else lastNum = array[i];
        }

        this.root = this.buildTree(array);
    }

    buildTree(arr, start = 0, end = arr.length - 1) {
        if (start > end) return null;
        
        const mid = parseInt((start + end) / 2);
        const root = new Node(arr[mid]);
        
        root.left = this.buildTree(arr, start, mid - 1);
        root.right = this.buildTree(arr, mid + 1, end);
        
        return root;
    }

    insert(value) {
        if (this.find(value) !== null) return;

        const temp = new Node(value);

        if (this.root === null) {
            this.root = temp;
            return;
        }

        // find the node who is going to have the new node as its child
        let curr = this.root;
        while (curr !== null) { 
            if (curr.value > value && curr.left !== null) curr = curr.left;
            else if (curr.value < value && curr.right !== null) curr = curr.right;
            else break;
        }

        if (curr.value > value) curr.left = temp;
        else curr.right = temp;
    }

    getSuccessor(curr) {
        curr = curr.right;
        while (curr !== null && curr.left !== null)
            curr = curr.left;
        return curr;
    }

    deleteItem(value, root = this.root) {
        if (root === null) return root;

        if (root.value > value)
            root.left = this.deleteItem(value, root.left);
        else if (root.value < value)
            root.right = this.deleteItem(value, root.right);
        else {
            // node with 0 or 1 child
            if (root.left === null)
                return root.right;
            if (root.right === null)
                return root.left;

            // node with 2 children
            const succ = this.getSuccessor(root);
            root.value = succ.value;
            root.right = this.deleteItem(succ.value, root.right);
        }
        return root;
    }

    find(value) {
        let tmp = this.root;
        while (tmp !== null) { 
            if (tmp.value > value && tmp.left !== null) tmp = tmp.left;
            else if (tmp.value < value && tmp.right !== null) tmp = tmp.right;
            else break;
        }

        if (tmp.value === value) return tmp;
        else return null;
    }

    levelOrder(arr = [], queue = [], root = this.root) {
        if (root === null) return;
        
        arr.push(root.value);

        queue.push(root.left);
        queue.push(root.right);

        while (queue.length) {
            const level = queue[0];
            queue.shift();
            this.levelOrder(arr, queue, level);
        }

        return arr;
    }

    inorder(arr = [], root = this.root) {
        if (root === null) return;
        
        if (root.left) this.inorder(arr, root.left);
        
        arr.push(root.value);
        
        if (root.right) this.inorder(arr, root.right);
        
        return arr;
    }

    preorder(arr = [], root = this.root) {
      if (root === null) return;
      
      arr.push(root.value);
      
      if (root.left) this.preorder(arr, root.left);
      
      if (root.right) this.preorder(arr, root.right);
      
      return arr;
    }

    postorder(arr = [], root = this.root) {
      if (root === null) return;

      if (root.left) this.postorder(arr, root.left);
      
      if (root.right) this.postorder(arr, root.right);
      
      arr.push(root.value);

      return arr;
    }

    height(value, root = this.find(value)) {
        if (root === null) return null;

        let lHeight = this.height(value, root.left);
        let rHeight = this.height(value, root.right);

        if (lHeight > rHeight) {
            return lHeight + 1;
        } else {
            return rHeight + 1;
        }
    }

    depth(value, root = this.root, depth = 0) {
        if (root === null) return null;
        if (value === root.value) return depth;
        if (value < root.value) {
            return this.depth(value, root.left, depth += 1);
        } else {
            return this.depth(value, root.right, depth += 1);
        }
    }

    isBalanced(root = this.root) {
        if (root === null) return true;

        const isLBalanced = this.isBalanced(root.left);
        const isRBalanced = this.isBalanced(root.right);

        if (isLBalanced === false || isRBalanced === false) return false;

        const lHeight = this.height(root.value, root.left);
        const rHeight = this.height(root.value, root.right);
        const diff = Math.abs(lHeight - rHeight);
        return diff < 2 ? true : false;
    }

    rebalance(root = this.root) {
        let arr = this.levelOrder([], [], root);
        arr.sort((a, b) => a - b);
        return this.root = this.buildTree(arr);
    }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) return;

    if (node.right !== null) prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    
    if (node.left !== null) prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array);
prettyPrint(tree.root);

// tree.insert(2);
// prettyPrint(tree.root);
// tree.insert(4);
// prettyPrint(tree.root);

// tree.deleteItem(2);
// prettyPrint(tree.root);

// console.log(tree.find(4));
// console.log(tree.find(10));

// console.log(tree.levelOrder());
// console.log(tree.inorder());
// console.log(tree.preorder());
// console.log(tree.postorder());

// console.log(tree.height(3));
// console.log(tree.height(2));
// console.log(tree.depth(4));
// console.log(tree.depth(2));

// console.log(tree.isBalanced());
// tree.insert(6346);
// prettyPrint(tree.root);
// console.log(tree.isBalanced());
// tree.rebalance();
// prettyPrint(tree.root);
// console.log(tree.isBalanced());