package backend.web;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Scanner;

import backend.model.Cliente;
import backend.model.Pedido;
import backend.model.Produto;
import backend.estrutura.FilaPedidos;
import backend.service.DashboardPerformance;

public class PedidoHandler implements HttpHandler {
    private FilaPedidos filaCozinha;
    private DashboardPerformance dashboard;

    public PedidoHandler(FilaPedidos filaCozinha, DashboardPerformance dashboard) {
        this.filaCozinha = filaCozinha;
        this.dashboard = dashboard;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1); 
            return;
        }

        if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {
            Scanner scanner = new Scanner(exchange.getRequestBody(), "UTF-8");
            String requestBody = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
            scanner.close();

            String nomeCliente = "Cliente Web";
            if (requestBody.contains("\"nome\":\"")) {
                nomeCliente = requestBody.split("\"nome\":\"")[1].split("\"")[0];
            }

            double totalPedido = 0.0;
            if (requestBody.contains("\"total\":")) {
                String totalStr = requestBody.split("\"total\":")[1].split(",")[0].replaceAll("[^0-9.]", "");
                if (!totalStr.isEmpty()) totalPedido = Double.parseDouble(totalStr);
            }

            Cliente clienteWeb = new Cliente("000.000.000-00", nomeCliente);
            Pedido pedidoWeb = new Pedido(clienteWeb);

            boolean temItens = false;
            if (requestBody.contains("\"itens\":[")) {
                String trechoItens = requestBody.split("\"itens\":\\[")[1].split("\\]")[0];
                String[] itensArray = trechoItens.split("\\{");

                for (String itemJson : itensArray) {
                    if (itemJson.contains("\"nome\":\"")) {
                        String nomeItem = itemJson.split("\"nome\":\"")[1].split("\"")[0];
                        double precoItem = 0.0;
                        if (itemJson.contains("\"preco\":")) {
                            String precoStr = itemJson.split("\"preco\":")[1].split(",")[0].replaceAll("[^0-9.]", "");
                            if (!precoStr.isEmpty()) precoItem = Double.parseDouble(precoStr);
                        }
                        Produto p = new Produto(999, nomeItem, precoItem, "Item do Site");
                        pedidoWeb.adicionarItem(p);
                        temItens = true;
                    }
                }
            }

            if (!temItens) {
                Produto pWeb = new Produto(999, "Pedido via Site", totalPedido, "Itens no Frontend"); 
                pedidoWeb.adicionarItem(pWeb);
            }

            filaCozinha.enqueue(pedidoWeb);
            dashboard.incrementarPedidos();
            
            System.out.println("\n[ALERTA COZINHA] Novo pedido de: " + nomeCliente + " | Total: R$ " + totalPedido);
            System.out.println("   -> Itens registrados: " + pedidoWeb.toString());
            System.out.print("Escolha: ");

            String response = "{\"status\": \"sucesso\"}";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}