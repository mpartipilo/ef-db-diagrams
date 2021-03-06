
export class ClrType {
    namespace: string;
    name: string;
    assembly: string;
    genericTypeArguments: ClrType[] = [];

    get isGeneric() { return !this.genericTypeArguments || this.genericTypeArguments.length === 0; }

    get prettyName(): string {
        let result = this.name;
        switch (result) {
            case 'Int32':
                result = 'int';
                break;
            case 'UInt32':
                result = 'uint';
                break;
            case 'Int16':
                result = 'short';
                break;
            case 'UInt16':
                result = 'ushort';
                break;
            case 'Int64':
                result = 'long';
                break;
            case 'UInt64':
                result = 'ulong';
                break;
            case 'Byte':
                result = 'byte';
                break;
            case 'SByte':
                result = 'sbyte';
                break;
            case 'Char':
                result = 'char';
                break;
            case 'Single':
                result = 'float';
                break;
            case 'Double':
                result = 'double';
                break;
            case 'Decimal':
                result = 'int';
                break;
            case 'String':
                result = 'string';
                break;
            case 'Boolean':
                result = 'bool';
                break;
        }

        const index = result.indexOf('`');
        if (index !== -1) {
            result = result.substring(0, index);
        }

        return result;
    }

    get isPrettyNameKeyword(): boolean {
        return this.name.indexOf('`') === -1 && this.prettyName !== this.name;
    }

    static fromJSON(obj: Object) {
        return Object.assign(new ClrType(), obj, {
            genericTypeArguments: obj['genericTypeArguments']
                ? obj['genericTypeArguments'].map(e => ClrType.fromJSON(e))
                : []
        });
    }

    equals(other: ClrType): boolean {
        return other instanceof ClrType && (
            this === other
            || this.assembly === other.assembly
            && this.namespace === other.namespace
            && this.name === other.name
            && this.genericTypeArguments.length === other.genericTypeArguments.length
            && this.genericTypeArguments.every((e, i) => other.genericTypeArguments[i].equals(e))
        );
    }
}
