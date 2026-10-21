package backend.service;

import backend.estrutura.FilaPedidos;

public class DashboardPerformance {
    private long tempoBubble = 0;
    private long tempoQuick = 0;
    private int pedidosProcessados = 0;
    private int totalUndos = 0;            
    private int totalItensCarrinho = 0;    

    public void registrarTempoBubble(long nanos) { tempoBubble = nanos; }
    public void registrarTempoQuick(long nanos) { tempoQuick = nanos; }
    public void incrementarPedidos() { pedidosProcessados++; }
    public void incrementarUndo() { totalUndos++; }
    public void registrarItensCarrinho(int qtd) { 
        totalItensCarrinho = (totalItensCarrinho + qtd) / 2;
    }
    public void setTotalUndos(int total) { this.totalUndos = total; }

    public long getTempoBubble() { return tempoBubble; }
    public long getTempoQuick() { return tempoQuick; }
    public int getPedidosProcessados() { return pedidosProcessados; }
    public int getTotalUndos() { return totalUndos; }
    public int getMediaItensCarrinho() { return totalItensCarrinho; }

    public void exibir(FilaPedidos fila) {
        System.out.println("\n=== DASHBOARD DE PERFORMANCE (RFC) ===");
        System.out.printf("Bubble Sort (O(n2))     : %.3f ms%n", tempoBubble / 1_000_000.0);
        System.out.printf("Quick Sort (O(n log n)) : %.3f ms%n", tempoQuick / 1_000_000.0);
        System.out.printf("Pedidos na fila         : %d%n", fila.size());
        System.out.printf("Pedidos processados     : %d%n", pedidosProcessados);
        System.out.printf("Undos (Desfazer)        : %d%n", totalUndos);
        long memoria = (Runtime.getRuntime().totalMemory() - Runtime.getRuntime().freeMemory()) / (1024 * 1024);
        System.out.printf("Memoria utilizada       : %d MB%n", memoria);
        System.out.println("=====================================");
    }
}