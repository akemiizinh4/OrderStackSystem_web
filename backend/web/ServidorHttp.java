package backend.web;

import com.sun.net.httpserver.HttpServer;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import backend.estrutura.FilaPedidos;
import backend.service.DashboardPerformance;

public class ServidorHttp {

    // Porta padrao no seu computador. Servicos de hospedagem (como o Render)
    // informam a porta pela variavel de ambiente PORT.
    private static final int PORTA_PADRAO = 8080;

    public static int lerPorta() {
        String porta = System.getenv("PORT");
        if (porta != null && !porta.isBlank()) {
            try {
                return Integer.parseInt(porta.trim());
            } catch (NumberFormatException e) {
                System.out.println("[AVISO] PORT invalida (" + porta + "), usando " + PORTA_PADRAO);
            }
        }
        return PORTA_PADRAO;
    }

    public static boolean iniciar(FilaPedidos filaCozinha, DashboardPerformance dashboard) {
        int porta = lerPorta();
        try {
            HttpServer server = HttpServer.create(new InetSocketAddress(porta), 0);

            server.createContext("/api/pedido", new PedidoHandler(filaCozinha, dashboard));
            server.createContext("/api/dashboard", new DashboardHandler(filaCozinha, dashboard));
            server.createContext("/api/pedido-entregue", new PedidoEntregueHandler());

            // Rota de saude: o Render (e voce) podem abrir o endereco raiz
            // para conferir se o servidor esta no ar.
            server.createContext("/", exchange -> {
                byte[] resposta = "{\"status\": \"online\"}".getBytes();
                exchange.getResponseHeaders().add("Access-Control-Allow-Origin", "*");
                exchange.getResponseHeaders().add("Content-Type", "application/json");
                exchange.sendResponseHeaders(200, resposta.length);
                try (OutputStream os = exchange.getResponseBody()) {
                    os.write(resposta);
                }
            });

            // Uma thread so: os pedidos sao atendidos um de cada vez,
            // entao a Fila e o Dashboard nunca sao alterados ao mesmo tempo.
            server.setExecutor(null);
            server.start();
            System.out.println("[WEB] Servidor Web iniciado na porta " + porta + ".");
            return true;
        } catch (Exception e) {
            System.out.println("[ERRO] Falha ao iniciar integracao web: " + e.getMessage());
            return false;
        }
    }
}
