package backend.web;

import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.util.Locale;
import java.util.Scanner;

import backend.estrutura.FilaPedidos;
import backend.service.DashboardPerformance;

public class DashboardHandler implements HttpHandler {
    private FilaPedidos filaCozinha;
    private DashboardPerformance dashboard;

    public DashboardHandler(FilaPedidos filaCozinha, DashboardPerformance dashboard) {
        this.filaCozinha = filaCozinha;
        this.dashboard = dashboard;
    }

    @Override
    public void handle(HttpExchange exchange) throws IOException {
        exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
        exchange.getResponseHeaders().add("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
        exchange.getResponseHeaders().add("Access-Control-Allow-Headers", "Content-Type");
        
        if (exchange.getRequestMethod().equalsIgnoreCase("OPTIONS")) {
            exchange.sendResponseHeaders(204, -1); return;
        }

        if (exchange.getRequestMethod().equalsIgnoreCase("GET")) {
            long memoria = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024);
            String json = String.format(Locale.US, 
                "{\"bubble\": %.3f, \"quick\": %.3f, \"pedidos\": %d, \"fila\": %d, \"memoria\": %d, \"undos\": %d}",
                dashboard.getTempoBubble() / 1_000_000.0,
                dashboard.getTempoQuick() / 1_000_000.0,
                dashboard.getPedidosProcessados(),
                filaCozinha.size(),
                memoria,
                dashboard.getTotalUndos()
            );
            exchange.getResponseHeaders().add("Content-Type", "application/json");
            exchange.sendResponseHeaders(200, json.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(json.getBytes());
            os.close();
        } 
        else if (exchange.getRequestMethod().equalsIgnoreCase("POST")) {
            Scanner scanner = new Scanner(exchange.getRequestBody(), "UTF-8");
            String requestBody = scanner.useDelimiter("\\A").hasNext() ? scanner.next() : "";
            scanner.close();

            if (requestBody.contains("\"bubble\":")) {
                String bStr = requestBody.split("\"bubble\":")[1].split(",")[0].replaceAll("[^0-9.]", "");
                if(!bStr.isEmpty()) dashboard.registrarTempoBubble((long)(Double.parseDouble(bStr) * 1_000_000));
            }
            if (requestBody.contains("\"quick\":")) {
                String qStr = requestBody.split("\"quick\":")[1].split(",")[0].replaceAll("[^0-9.]", "");
                if(!qStr.isEmpty()) dashboard.registrarTempoQuick((long)(Double.parseDouble(qStr) * 1_000_000));
            }
            if (requestBody.contains("\"undos\":")) {
                String uStr = requestBody.split("\"undos\":")[1].replaceAll("[^0-9]", "");
                if(!uStr.isEmpty()) {
                    int valorUndo = Integer.parseInt(uStr);
                    while(dashboard.getTotalUndos() < valorUndo) dashboard.incrementarUndo();
                }
            }
            System.out.println("\n[INFO] Dashboard sincronizado com o site!");
            System.out.print("Escolha: ");
            
            String response = "{\"status\": \"sucesso\"}";
            exchange.sendResponseHeaders(200, response.getBytes().length);
            OutputStream os = exchange.getResponseBody();
            os.write(response.getBytes());
            os.close();
        }
    }
}