/**
 * 滚动工具函数
 */

/**
 * 滚动到指定ID的元素
 * @param {string} id - 目标元素的ID（不含#）
 */
export const scrollToElement = (id) => {
  const targetId = id.startsWith("#") ? id.substring(1) : id;

  const element = document.getElementById(targetId);
  if (!element) {
    console.warn(`Element with id ${targetId} not found`);
    return;
  }

  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });

  // window.history.pushState(null, "", `#${targetId}`);
};
