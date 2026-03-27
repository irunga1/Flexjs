import { FakeStore } from "./models/FakeStore.js";
import { productCard } from "./views/productCard.js";
import { runPostRender } from "./helper/postRenderFn.js";
import { FlexJS } from "./core/Flex.js";
import { runBeforeRender } from "./helper/preRenderFn.js";

const fakeStoreApiUrl = "https://fakestoreapi.com/products/";
const flexApp = new FlexJS(fakeStoreApiUrl);

flexApp.init(productCard, runPostRender, "container", FakeStore, runBeforeRender, 20);
flexApp.applyStylesheet();
