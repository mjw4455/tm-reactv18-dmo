// //1、创建虚拟DOM
const React = {
  createElement: (type: any, props: any, ...children: any) => {
    return {
      type,
      props: {
        ...props,
        children: children.map((child: any) => {
          console.log("====", child);
          if (typeof child === "object") {
            return child;
          } else {
            return React.createTextElement(child);
          }
        }),
      },
    };
  },
  createTextElement: (text: string) => {
    return {
      type: "TEXT_ELEMENT",
      props: {
        nodeValue: text,
        children: [],
      },
    };
  },
};

// const element = React.createElement(
//   "div",
//   {
//     id: "123",
//   },
//   React.createElement("h1", {}, "hello"),
//   React.createElement("h2", {}, "world")
// );
// console.log("element==", element);

// 2、创建虚拟Fiber
//下一个工作单元
let nextUnitOfWork: any = null;

let wipRoot: any = null; //工作的根节点 faber树

let currentRoot: any = null; //当前的根节点

let deletions: any = []; //删除的节点

//初始化工作单元
function render(element: any, container: any) {
  wipRoot = {
    dom: container,
    props: {
      children: [element],
    },
    alternate: currentRoot,
  };
  deletions = [];
  nextUnitOfWork = wipRoot;
}

function workLoop(deadline: any) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    shouldYield = deadline.timeRemaining() < 1;
  }
  //没有工作单元时，映射wipRoot
  if (!nextUnitOfWork && wipRoot) {
    commitRoot(wipRoot);
  }
  requestIdleCallback(workLoop);
}

requestIdleCallback(workLoop);

function performUnitOfWork(fiber: any) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  //遍历子节点
  const elements = fiber.props.children;
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }

  let nextFiber = fiber;
  while (nextFiber) {
    if (nextFiber.sibling) {
      return nextFiber.sibling;
    }
    nextFiber = nextFiber.parent;
  }
  return null;
}

function reconcileChildren(fiber: any, children: any) {
  //遍历子节点
  let index = 0;
  let prevSibling = null;
  let olderFiber = fiber.alternate && fiber.alternate.child;
  while (index < children.length) {
    let newFiber = null;
    const element = children[index];
    const sameType = olderFiber && element && element.type === olderFiber.type;
    //diff
    //1、复用
    if (sameType) {
      newFiber = {
        type: olderFiber.type,
        props: element.props,
        parent: fiber,
        dom: olderFiber.dom,
        sibling: {},
        alternate: olderFiber,
        effectTag: "UPDATE",
      };
    }
    //2、新增
    if (element && !sameType) {
      newFiber = {
        type: element.type,
        props: element.props,
        parent: fiber,
        dom: element.dom,
        sibling: {},
        alternate: null,
        effectTag: "PLACEMENT",
      };
    }

    //3、删除,新节点不存在,老节点存在
    if (olderFiber && !sameType) {
      olderFiber.effectTag = "DELETION";
      deletions.push(olderFiber);
    }

    if (olderFiber) {
      olderFiber = olderFiber.sibling;
    }

    if (index === 0) {
      fiber.child = newFiber;
    } else {
      newFiber && (prevSibling!.sibling = newFiber);
    }
    prevSibling = newFiber;
    index++;
  }
}

//commitRoot作用
function commitRoot(wipRootFiber: any) {
  deletions.forEach(commitWork);
  commitWork(wipRootFiber.child);
  currentRoot = wipRootFiber;
  wipRoot = null;
}

function commitWork(fiber: any) {
  if (!fiber) {
    return;
  }
  const parentDom = fiber.parent.dom;
  if (fiber.effectTag == "PLACEMENT" && fiber.dom != null) {
    parentDom.appendChild(fiber.dom);
  }
  if (fiber.effectTag == "DELETE" && fiber.dom != null) {
    parentDom.removeChild(fiber.dom);
  }
  if (fiber.effectTag == "UPDATE" && fiber.dom != null) {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props);
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}

function createDom(fiber: any) {
  const dom =
    fiber.type === "TEXT_ElEMENT"
      ? document.createTextNode("")
      : document.createElement(fiber.type);
  //dom还有属性、文本需要更新dom结构
  updateDom(dom, {}, fiber.props);
  return dom;
}

function updateDom(dom: any, prevProps: any, nextProps: any) {
  //删除旧的属性
  Object.keys(prevProps)
    .filter((name) => name !== "children")
    .forEach((prop) => {
      dom[prop] = "";
    });
  //添加新的属性
  Object.keys(nextProps)
    .filter((name) => name !== "children")
    .forEach((prop) => {
      dom[prop] = nextProps[prop];
    });
}


