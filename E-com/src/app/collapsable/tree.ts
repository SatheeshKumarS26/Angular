function tableNode(data) {
      this.name = data.name;
      this.color = data.color;
      this.enableClick = data.enableClick;
      this.children = [];
    }

    function Tree() {
      this.root = null;
    }

    Tree.prototype.add = function(data, toNodeData) {
      const node = new tableNode(data);
      const parent = toNodeData ? this.findBFS(toNodeData) : null;
      if (parent) {
        parent.children.push(node);
      } else {
        if (!this.root) {
          this.root = node;
        } else {
          return 'Root node is already assigned';
        }
      }
    };
    Tree.prototype.remove = function(data) {
      if (this.root.name === data.name) {
        this.root = null;
      }

      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        for (let i = 0; i < node.children.length; i++) {
          if (node.children[i].name === data.name) {
            node.children.splice(i, 1);
          } else {
            queue.push(node.children[i]);
          }
        }
      }
    };
    Tree.prototype.contains = function(data) {
      return this.findBFS(data) ? true : false;
    };
    Tree.prototype.findBFS = function(data) {
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        if (node.name === data.name) {
          return node;
        }
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
      return null;
    };
    Tree.prototype._preOrder = function(node, fn) {
      if (node) {
        if (fn) {
          fn(node);
        }
        for (let i = 0; i < node.children.length; i++) {
          this._preOrder(node.children[i], fn);
        }
      }
    };
    Tree.prototype._postOrder = function(node, fn) {
      if (node) {
        for (let i = 0; i < node.children.length; i++) {
          this._postOrder(node.children[i], fn);
        }
        if (fn) {
          fn(node);
        }
      }
    };
    Tree.prototype.traverseDFS = function(fn, method) {
      const current = this.root;
      if (method) {
        this['_' + method](current, fn);
      } else {
        this._preOrder(current, fn);
      }
    };
    Tree.prototype.traverseBFS = function(fn) {
      const queue = [this.root];
      while (queue.length) {
        const node = queue.shift();
        if (fn) {
          fn(node);
        }
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
    };
    Tree.prototype.print = function() {
      if (!this.root) {
        return console.log('No root node found');
      }
      const newline = new tableNode('|');
      const  queue = [this.root, newline];
      let string = '';
      while (queue.length) {
        const node = queue.shift();
        string += node.name.toString() + ' ';
        if (node === newline && queue.length) {
          queue.push(newline);
        }
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
      console.log(string.slice(0, -2).trim());
    };
    Tree.prototype.printByLevel = function() {
      if (!this.root) {
        return console.log('No root node found');
      }
      const  newline = new tableNode('\n');
      const  queue = [this.root, newline];
      let string = '';
      while (queue.length) {
        const  node = queue.shift();
        string += node.name.toString() + (node.name !== '\n' ? ' ' : '');
        if (node === newline && queue.length) {
          queue.push(newline);
        }
        for (let i = 0; i < node.children.length; i++) {
          queue.push(node.children[i]);
        }
      }
      console.log(string.trim());
    };

    class Prop {
      name: string;
      color: string;
      enableClick: boolean;

      constructor(name: string, color: string, selected: boolean) {
          this.name = name;
          this.color = color;
          this.enableClick = selected;
      }

    }

  function getChildTableList(tableName: string): Prop[] {

    const  tableList = [];

      const address = new Prop('ADDRESS', 'white', true);
      const  member = new Prop('MEMBER', 'white', false);
      const  claim = new Prop('CLAIM', 'white', false);
      const  claimList = new Prop('CLAIMLIST', 'white', false);
      const  subscriber = new Prop('SUBSCRIBER', 'white', false);
      const  provider = new Prop('PROVIDER', 'white', false);

      if (tableName === 'ADDRESS') {
          tableList.push(member);
          tableList.push(provider);
      } else if (tableName === 'MEMBER') {
          tableList.push(claim);
          tableList.push(subscriber);
      } else if (tableName === 'CLAIM') {
        tableList.push(claimList);
      } else {
        // null;
      }
      return tableList;

  }

  function getTableProperty(tableName: string): Prop {
      let table: Prop;
      if (tableName === 'ADDRESS') {
          table = new Prop('ADDRESS', 'white', false);
      } else if (tableName === 'MEMBER') {
          table = new Prop('MEMBER', 'white', false);
      } else if (tableName === 'CLAIM') {
          table = new Prop('CLAIM', 'white', false);
      } else if (tableName === 'SUBSCRIBER') {
          table = new Prop('SUBSCRIBER', 'white', false);
      } else if (tableName === 'PROVIDER') {
          table = new Prop('PROVIDER', 'white', false);
      } else if (tableName === 'CLAIMLIST') {
          table = new Prop('CLAIMLIST', 'white', false);
      }
      return table;
  }

  function isSelectedPath(inputTableList: string[], tableName: string): boolean {
      for (let i = 0; i < inputTableList.length; i++) {
          if (tableName === inputTableList[i]) {
              return true;
          }
      }
      return false;
  }

  function isPath(inputTableList: string[], tableName: string): boolean {
    for (let i = 0; i < inputTableList.length; i++) {
      if (tableName === inputTableList[i]) {
          return true;
      }
    }
  return false;
  }

 export function toJson(inputTableList: string []) {
      const tree = new Tree();
      const toggleTable = inputTableList[inputTableList.length - 1]; // Last table is selected table.

      for (let i = 0; i < inputTableList.length; i++) {
          const parent = getTableProperty(inputTableList[i]);

          if (i === 0) {
             // parent.isSelected = isSelectedPath(inputTableList,parent.tableName);
              parent.color = '#F94B4C';
               // Set the selected flag for last table in the input table list
              if (toggleTable === parent.name) {
                parent.enableClick = isSelectedPath(inputTableList, parent.name);
              }
              tree.add(parent);
          }
          // console.log('Parent: ' + parent.tableName);

          const childTableList: Prop [] = getChildTableList(parent.name);
          for ( let j = 0; j < childTableList.length; j++) {

            // Set the selected flag for last table in the input table list
            if (toggleTable === childTableList[j].name) {
              childTableList[j].enableClick = isSelectedPath(inputTableList, childTableList[j].name);
            }

            if (isPath(inputTableList, childTableList[j].name)) {
              childTableList[j].color = 'black';
            }
              //  console.log('Child:' + childTableList[j].tableName);
            tree.add(childTableList[j], parent);
          }

      }
      return JSON.stringify(tree.root);
     }
