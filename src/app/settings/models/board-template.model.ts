export class BoardTemplateModel {
  id: number;
  title: string;
  content: string;

  constructor(id: number, title: string, content: string) {
    this.id = id;
    this.title = title;
    this.content = content;
  }

  getId(): number {
    return this.id;
  }

  getTitle(): string {
    return this.title;
  }

  getContent(): string {
    return this.content;
  }
}
