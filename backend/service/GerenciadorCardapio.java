package backend.service;

import java.util.ArrayList;
import backend.model.Produto;

public class GerenciadorCardapio {
    public static ArrayList<Produto> inicializarCardapio() {
        ArrayList<Produto> cardapio = new ArrayList<>();
        cardapio.add(new Produto(1, "Lamen", 38.00, "Caldo a base de misso ou shoyu, macarrao, carne suina, ovo cozido, cebolinha e alga."));
        cardapio.add(new Produto(2, "Udon", 36.00, "Macarrao grosso japones, caldo leve, legumes, proteina e cebolinha."));
        cardapio.add(new Produto(3, "Yakissoba", 32.00, "Macarrao oriental, legumes, carne/frango e molho shoyu."));
        cardapio.add(new Produto(4, "Uramaki (8 un.)", 28.00, "Arroz por fora, recheio de salmao ou kani, cream cheese e gergelim."));
        cardapio.add(new Produto(5, "Sashimi (10 un.)", 42.00, "Fatias de peixe cru (salmao ou atum)."));
        cardapio.add(new Produto(6, "Temaki", 26.00, "Alga nori, arroz, salmao/kani, cream cheese e cebolinha."));
        cardapio.add(new Produto(7, "Temaki Frito", 30.00, "Temaki empanado e frito com recheio de salmao e cream cheese."));
        cardapio.add(new Produto(8, "Temaki Grelhado", 32.00, "Temaki com salmao grelhado, cream cheese e molho especial."));
        cardapio.add(new Produto(9, "Missoshiru", 12.00, "Sopa de misso com tofu, cebolinha e alga."));
        cardapio.add(new Produto(10, "Hossomaki (8 un.)", 24.00, "Arroz e alga com recheio simples (salmao, pepino ou kani)."));
        cardapio.add(new Produto(11, "Hot Roll (8 un.)", 30.00, "Sushi empanado e frito com salmao e cream cheese."));
        cardapio.add(new Produto(12, "Hamburguer", 28.00, "Pao, carne bovina, queijo, alface, tomato e molho da casa."));
        cardapio.add(new Produto(13, "Mac and Cheese", 25.00, "Macarrao com molho cremoso de queijos."));
        cardapio.add(new Produto(14, "Buffalo Wings (6 un.)", 30.00, "Asinhas de frango com molho picante."));
        cardapio.add(new Produto(15, "Barbecue Ribs", 45.00, "Costela suina ao molho barbecue."));
        cardapio.add(new Produto(16, "Hot Dog", 18.00, "Pao, salsicha, molho, milho, batata palha e vinagrete."));
        cardapio.add(new Produto(17, "Fried Chicken", 28.00, "Frango empanado e frito, crocante."));
        cardapio.add(new Produto(18, "Pulled Pork Sandwich", 32.00, "Pao, carne suina desfiada, molho barbecue e salada."));
        cardapio.add(new Produto(19, "Gohan", 10.00, "Arroz branco temperado japones."));
        cardapio.add(new Produto(20, "Shimeji na manteiga", 18.00, "Cogumelos salteados com manteiga e shoyu."));
        cardapio.add(new Produto(21, "Sunomono", 12.00, "Salada de pepino agridoce com gergelim."));
        cardapio.add(new Produto(22, "Salada verde", 12.00, "Alface, tomate e molho."));
        cardapio.add(new Produto(23, "Batata frita", 15.00, "Porcao de batatas crocantes."));
        cardapio.add(new Produto(24, "Onion rings", 16.00, "Aneis de cebola empanados."));
        cardapio.add(new Produto(25, "Molhos extras", 3.00, "Tare, shoyu ou maionese temperada."));
        cardapio.add(new Produto(26, "Guioza (4 un.)", 18.00, "Pastel japones recheado com carne suina."));
        cardapio.add(new Produto(27, "Tempura de legumes", 20.00, "Legumes empanados e fritos."));
        cardapio.add(new Produto(28, "Mochi", 12.00, "Bolinho de arroz com recheio doce."));
        cardapio.add(new Produto(29, "Dorayaki", 14.00, "Panqueca japonesa com recheio."));
        cardapio.add(new Produto(30, "Tempura de sorvete", 18.00, "Sorvete empanado e frito."));
        cardapio.add(new Produto(31, "Cheesecake", 20.00, "Creme de queijo e calda de frutas vermelhas."));
        cardapio.add(new Produto(32, "Brownie", 15.00, "Bolo de chocolate denso com calda."));
        cardapio.add(new Produto(33, "Petit gateau", 22.00, "Bolinho cremoso com sorvete."));
        cardapio.add(new Produto(34, "Sorvete", 10.00, "Bola de sorvete (sabores variados)."));
        cardapio.add(new Produto(35, "Banana caramelizada", 14.00, "Banana frita com calda de acucar."));
        cardapio.add(new Produto(36, "Churros", 12.00, "Massa frita com doce de leite."));
        cardapio.add(new Produto(37, "Refrigerante", 7.00, "Opcoes de latas geladas."));
        cardapio.add(new Produto(38, "Suco natural", 10.00, "Suco feito na hora."));
        cardapio.add(new Produto(39, "Suco industrializado", 8.00, "Opcoes em lata ou caixa."));
        cardapio.add(new Produto(40, "Agua", 5.00, "Garrafa 500ml."));
        cardapio.add(new Produto(41, "Cha gelado", 8.00, "Ice Tea gelado."));
        cardapio.add(new Produto(42, "Cha quente", 7.00, "Cha tradicional."));
        cardapio.add(new Produto(43, "Cerveja", 12.00, "Lata 350ml."));
        cardapio.add(new Produto(44, "Saque", 18.00, "Dose tradicional."));
        return cardapio;
    }
}