export namespace models {
	
	export class Erro {
	    Mensagem: string;
	
	    static createFrom(source: any = {}) {
	        return new Erro(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Mensagem = source["Mensagem"];
	    }
	}

}

export namespace responses {
	
	export class CalculoResponse {
	    Resultado: number;
	    Erro: models.Erro;
	
	    static createFrom(source: any = {}) {
	        return new CalculoResponse(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.Resultado = source["Resultado"];
	        this.Erro = this.convertValues(source["Erro"], models.Erro);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}

}

