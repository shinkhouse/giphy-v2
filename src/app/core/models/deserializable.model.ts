export interface Deserializable {
    deserialize(input: this | any): this;
}
