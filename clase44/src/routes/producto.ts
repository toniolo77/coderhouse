import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import config from '../config/config'
import {
  getProducto,
  addProducto,
  deleteProducto,
  updateProducto,
} from "../controller/producto";

class RouterProductos {

  start() {
      // GraphQL schema
      const schema = buildSchema(`
          type Query {
              producto(id: String!): Producto,
              productos: [Producto],
          }
          type Mutation {
              addProducto(
                producto: ProductoInput,
              ): Producto,
              updateProducto(
                  id: ID!,
                  producto: ProductoInput,
              ): Producto,
              deleteProducto(
                  id: ID!,
              ): Producto,                                
          },
          type Producto {
              id: String
              timestampt: Int
              nombre: String
              descripcion: String
              codigo: String
              foto: String
              precio: Float
              stock: Int
              fyh: String
          }
          input ProductoInput {
              nombre: String!
              descripcion: String!
              codigo: String!
              foto: String!
              precio: Float!
              stock: Int!
          }    
      `);

      // Root resolver
      const root = {
          producto : ({id}) => getProducto(id),
          productos : () => getProducto(),
          addProducto : ({producto}) => addProducto(producto),
          updateProducto: ({id, producto}) => updateProducto(id,producto),
          deleteProducto : ({id}) => deleteProducto(id),
      };

      return graphqlHTTP({
          schema: schema,
          rootValue: root,
          graphiql: config.GRAPHIQL == 'true'
      })
  }
}

export default RouterProductos;
