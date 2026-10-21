package backend.web;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Scanner;

public class PedidoEntregueHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");

        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1); return;
        }

        if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {
            Scanner scanner = new Scanner(exchange.getRequestBody(), "UTF-8");
            String requestBody = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
            scanner.close();

            String nome = "Cliente";
            if (requestBody.contains("\"nome\":\"")) {
                nome = requestBody.split("\"nome\":\"")[1].split("\"")[0];
            }

            System.out.println("\n[CHECKOUT] O cliente " + nome + " confirmou o recebimento do pedido!");
            System.out.println("   -> Status: ENTREGUE (O(1) - Finalizado)");
            System.out.print("Escolha: ");

            String response = "{\"status\": \"recebido\"}";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}