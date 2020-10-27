import { ConfirmarComponent } from './../confirmar/confirmar.component';
import { MatDialog } from '@angular/material/dialog';
import { ProdutoService } from './../../services/produto.service';
import { Component, OnInit, Input } from '@angular/core';
import { Produto } from 'src/app/models/produto';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.component.html',
  styleUrls: ['./carrinho.component.css']
})
export class CarrinhoComponent implements OnInit {

  @Input() mostrarFinalizar = true;
  @Input() frete = 0;

  constructor(public produtoService: ProdutoService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public getTotal() {
    var total = 0;
    this.produtoService.produtosCarrinho.forEach(p => {
      p.precoTotal = p.preco * p.qtd;
      total += (p.precoTotal);
    });

    total += this.frete;

    // Desce a scroll bar
    document.getElementById("scrollDiv").scrollTop = document.getElementById("scrollDiv").scrollHeight;
    return total;
  }

  public removerProduto(prod: Produto) {
    this.produtoService.inDialog = true;
    var ref = this.dialog.open(ConfirmarComponent, {

    });
    ref.afterClosed().subscribe(a => {
      this.produtoService.inDialog = false;
      if (a == "Sim") {
        this.produtoService.produtosCarrinho = this.produtoService.produtosCarrinho.filter(p => p.nome != prod.nome);
      }
    })

  }

  public onQtdChange(p: Produto) {
    this.produtoService.produtosCarrinho.forEach(prod => {
      if (prod.nome == p.nome) {
        prod.qtd++;

      }
    });
  }

  goFinalizar() {

  }

}
