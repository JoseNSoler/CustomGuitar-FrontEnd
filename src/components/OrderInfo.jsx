import React from "react";
import { Card } from "react-bootstrap";
import Table from "./Table";

const OrderInfo = ({ order }) => {
  function hasLuthier() {
    return order.carrito.filter((cart) => cart.luthier.seleccionado).length;
  }
  let formatNumber = Intl.NumberFormat('es-CO');

  return (
    <div>
      <Card className="orderInfo" id="cardOrderInfoID">
        <Card.Body className="orderTable">
          <Card.Title>{"Orden de compra".toUpperCase()}</Card.Title>
          <Card.Text className="m-0">
            <b>No</b>: {order.id}
          </Card.Text>
          <Card.Text className="m-0">
            <b>Fecha</b>: {order.fecha}
          </Card.Text>
          <Table
            columns={[
              {
                Header: "Articulo",
                columns: [
                  { Header: "Cant", accessor: "cantidad" },
                  { Header: "Descripcion", accessor: "descripcion" },
                ],
              },
              hasLuthier()
                ? {
                    Header: "Precio",
                    columns: [
                      { Header: "Unitario", accessor: "precioUnitario" },
                      { Header: "Certificado", accessor: "precioCertificado" },
                      { Header: "Total", accessor: "precioTotal" },
                    ],
                  }
                : {
                    Header: "Precio",
                    columns: [
                      { Header: "Unitario", accessor: "precioUnitario" },
                      { Header: "Total", accessor: "precioTotal" },
                    ],
                  },
            ]}
            data={order.carrito?.map((cart) => {
              return {
                descripcion: `Guitarra ${cart.guitarra.tipo.toLowerCase()} marca ${
                  cart.guitarra.marca
                } con afinación ${cart.guitarra.afinacion} y ${
                  cart.guitarra.numCuerdas
                } cuerdas de ${cart.guitarra.tipoCuerda.toLowerCase()}.`,
                cantidad: cart.cantidad,
                precioUnitario: `$${formatNumber.format(cart.guitarra.precio)}`,
                precioCertificado: `$${formatNumber.format(cart.luthier.precio)}`,
                precioTotal: `$${formatNumber.format(cart.total)}`,
              };
            })}
          />
          <Card.Text>
            <b id="totalCostOrder">Costo total</b>: ${formatNumber.format(order.total)}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default OrderInfo;
