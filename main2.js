import { FakeStore } from "./models/FakeStore.js";
import { productCard } from "./views/productCard.js";
import { postRenderFn } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { preRenderFn } from "./helper/preRenderFn.js";
 
const app = new FlexJS("https://fakestoreapi.com/products");
app.init(productCard, postRenderFn, "container", FakeStore, preRenderFn, 20);
app.callCSS();