import { ProductRepository, IProductModel } from "../models/product";

export function createProduct(req: any, res: any) {
  const productRepository = new ProductRepository();
  productRepository.create(<IProductModel>req.body, (err, product) => {
    if (err) {
      return res.status(500).send();
    } else {
      res.status(201).json({ product });
    }
  });
}

export function updateProduct(req: any, res: any) {
  const productRepository = new ProductRepository();
  productRepository.update(req.params.id, <IProductModel>req.body, (err, product) => {
    if (err) {
      res.status(500).send();
    } else {
      res.status(200).json({ product });
    }
  })
}

export function getProduct(req: any, res: any) {
  const productRepository = new ProductRepository();
  productRepository.findById(req.params.id, (err, product) => {
    if (err) {
      return res.status(500).send();
    } else {
      res.status(200).json(product);
    }
  })
}

export function deleteProduct(req: any, res: any) {
  const productRepository = new ProductRepository();
  productRepository.delete(req.params.id, (err) => {
    if (err) {
      return res.status(500).send();
    } else {
      res.status(200).json({});
    }
  });
}

export function listProduct(req: any, res: any) {
  const productRepository = new ProductRepository();
  productRepository.retrieve((err, products) => {
    if (err) {
      return res.status(500).send();
    } else {
      res.status(201).json({ products });
    }
  });
}