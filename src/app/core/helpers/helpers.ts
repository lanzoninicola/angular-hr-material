export default class Helper {
  static mapToObjectLiteral(mapObj: Map<any, any>): {
    [key: string]: any;
  } {
    return Array.from(mapObj).reduce(
      (obj: { [key: string]: any }, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {}
    );
  }
}
