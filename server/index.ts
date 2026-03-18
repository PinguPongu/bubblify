import express, { Request, Response, Router, Express } from "express";
import { json } from "body-parser";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger.json";
import { getBundles, getProducts } from "./services/bubbleService";

interface Order {
  [key: string]: unknown;
}

interface OrderCollection {
  [telephone: string]: Order[];
}

const app: Express = express();
const router: Router = Router();
const PORT = 3500;

let orders: OrderCollection = {};

const checkExistence = <T>(elems: T[], res: Response): Response => {
  return elems.length > 0
    ? res.json(elems[0])
    : res.status(404).send("Not found");
};

app.use(json());
app.use(cors());
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, { explorer: true })
);

router.get("/bubbles", (_req: Request, res: Response) => {
  res.json(getProducts());
});

router.get("/bubbles/:bubbleId", (req: Request, res: Response) => {
  const { bubbleId } = req.params;
  const product = getProducts((p) => p.id === parseInt(bubbleId));
  checkExistence(product, res);
});

router.get("/bundles", (_req: Request, res: Response) => {
  res.json(getBundles());
});

router.get("/bundles/:bundleId", (req: Request, res: Response) => {
  const { bundleId } = req.params;
  const bundle = getBundles((b) => b.id === parseInt(bundleId));
  checkExistence(bundle, res);
});

router.get("/orders/:telephone", (req: Request, res: Response) => {
  const { telephone } = req.params;
  orders[telephone]
    ? res.json(orders[telephone])
    : res.status(404).send(`No orders are found for ${telephone}`);
});

router.post("/orders/:telephone", (req: Request, res: Response) => {
  const { telephone } = req.params;
  const order: Order = req.body;
  orders[telephone]
    ? orders[telephone].push(order)
    : (orders[telephone] = [order]);
  res.send(`Order for ${telephone} was successfully issued!`);
});

app.use("/api", router);

app.listen(process.env.PORT || PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
