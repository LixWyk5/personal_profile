import { useEffect } from "react";
import { config } from "../data/config";

const MetaUpdater = () => {
  useEffect(() => {
    document.title = config.title;

    const metaDescription = document.getElementById("meta-description");
    if (metaDescription) {
      metaDescription.setAttribute("content", config.description.long);
    }
  }, []);

  return null;
};

export default MetaUpdater;
