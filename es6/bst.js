/* 
  二叉查找树，
  包括添加
  查找： 中序，先序，后序
  删除
*/

class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
  show() {
    return this.data;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(data) {
    var n = new Node(data, null, null);
    if (this.root == null) {
      this.root = n;
    }
    else {
      var current = this.root;
      var parent;
      while (true) {
        parent = current;
        if (data < current.data) {
          current = current.left;
          if (current == null) {
            parent.left = n;
            break;
          }
        }
        else {
          current = current.right;
          if (current == null) {
            parent.right = n;
            break;
          }
        }
      }
    }
  }

  // 中序遍历
  /* 
    中序遍历按照节点上的键值，以升序访问 BST 上的所有节点
  */
  inOrder(node) {
    if (node != null) {
      this.inOrder(node.left);
      console.log(node.show() + " ");
      this.inOrder(node.right);
    }
  }

  /* 
    先序遍历先访问根节点，然后以同样方式访问左子树和右子树
  */

  preOrder(node) {
    if (node != null) {
      console.log(node.show() + " ");
      this.preOrder(node.left);
      this.preOrder(node.right);
    }
  }

  /* 
    后序 遍历先访问叶子节点，从左子树到右子树，再到根节点。
  */
  postOrder(node) {
    if (!(node == null)) {
      this.postOrder(node.left);
      this.postOrder(node.right);
      console.log(node.show() + " ");
    }
  }


  getMin(node) {
    var current = node || this.root;
    while (current.left != null) {
      current = current.left;
    }
    return current;
  }

  getMax() {
    var current = this.root;
    while (current.right != null) {
      current = current.right;
    }
    return current;
  }

  find(data) {
    var current = this.root;
    while (current != null) {
      if (current.data == data) {
        return current;
      } else if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  remove(data) {
    return this.removeNode(this.root, data);
  }

  removeNode(node, data) {
    if (node == null) {
      return null;
    }
    if (data == node.data) {
      // 没有子节点的节点
      if (node.left == null && node.right == null) {
        return null;
      }
      // 没有左子节点的节点
      if (node.left == null) {
        return node.right;
      }
      // 没有右子节点的节点
      if (node.right == null) {
        return node.left;
      }
      // 有两个子节点的节点
      var tempNode = this.getMin(node.right);
      node.data = tempNode.data;
      node.right = this.removeNode(node.right, tempNode.data); 
      return node;
    } else if (data < node.data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }


}

var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);

// nums.inOrder(nums.root);

/* 
3 
16 
22 
23 
37 
45 
99 
*/

// nums.preOrder(nums.root);

/* 
23 
16 
3 
22 
45 
37 
99 
*/

// nums.postOrder(nums.root);

/* 
3 
22 
16 
37 
99 
45 
23
*/

// console.log(nums.getMin())

// console.log(nums.getMax())


// console.log(nums.find(16))

console.log(nums.remove(16))

console.log(JSON.stringify(nums));