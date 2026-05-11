package backend.model;

public class Produto {
    private int id;
    private String nome;
    private double preco;
    private String descricao;

    public Produto(int id, String nome, double preco, String descricao) {
        this.id = id;
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
    }

    public int getId() { return id; }
    public String getNome() { return nome; }
    public double getPreco() { return preco; }
    public String getDescricao() { return descricao; }

    @Override
    public String toString() {
        return String.format("[%d] %s - R$ %.2f", id, nome, preco);
    }
}