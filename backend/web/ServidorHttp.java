package backend.web;

import com.sun.net.httpserver.HttpServer;
import java.net.InetSocketAddress;
import backend.estrutura.FilaPedidos;
import backend.service.DashboardPerformance;

public class ServidorHttp {
    public static void iniciar(FilaPedidos filaCozinha, DashboardPerformance dashboard) {
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
            
            server.createContext("/api/pedido", new PedidoHandler(filaCozinha, dashboard));
            server.createContext("/api/dashboard", new DashboardHandler(filaCozinha, dashboard));
            server.createContext("/api/pedido-entregue", new PedidoEntregueHandler());
            
            server.setExecutor(null);
            server.start();
            System.out.println("[WEB] Servidor Web iniciado na porta 8080.");
        } catch (Exception e) {
            System.out.println("[ERRO] Falha ao iniciar integracao web: " + e.getMessage());
        }
    }
}