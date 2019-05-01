import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

@Directive({ selector: '[appUnless]' })
export class UnlessDirective {

  private hasView = false;

  constructor(templateRef: TemplateRef<any>,
              viewContainer: ViewContainerRef) {}

  @Input() set appUnless(condition: boolean) {
    
    if(!condition && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if(condition && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}


.panel-heading {
  padding: 10px 15px;
  border-bottom: 1px solid transparent;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  color: #333;
  background-color: #f5f5f5;
  border-color: #ddd;
  cursor: pointer;
}

.panel-title {
  margin-top: 0;
  margin-bottom: 0;
  font-size: 16px;
  color: inherit;
}

.panel-body {
  padding: 15px;
}

<p *appUnless="condition" class="unless a"></p>
