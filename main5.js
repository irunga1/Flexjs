
import { cardNews } from "./views/newsCard.js";
import { runPostRender } from "./helper/postRenderFn3.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";
import { News } from "./models/News.js";



const flexApp = new FlexJS("data/news.js");
flexApp.init(cardNews, runPostRender, "container", News, runBeforeRender, 20);
flexApp.applyStylesheet("news.css");
