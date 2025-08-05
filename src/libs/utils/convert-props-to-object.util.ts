import { BaseEntity } from '../domain/entity.base';
import { BaseValueObject } from '../domain/vo.base';

function isEntity(obj: unknown): obj is BaseEntity<unknown> {
    /**
     * 'instanceof BaseEntity' causes error here for some reason.
     * Probably creates some circular dependency.
     */
    return (
        Object.prototype.hasOwnProperty.call(obj, 'toObject') &&
        Object.prototype.hasOwnProperty.call(obj, 'id') &&
        BaseValueObject.isValueObject((obj as BaseEntity<unknown>).id)
    );
}

function convertToPlainObject(item: any): any {
    if (BaseValueObject.isValueObject(item)) {
        return item.unpack();
    }
    if (isEntity(item)) {
        return item.toObject();
    }
    return item;
}

/**
 * Converts Entity/Value Objects props to a plain object.
 * Useful for testing and debugging.
 * @param props
 */
export function convertPropsToObject(props: any): any {
    const propsCopy = structuredClone(props);

    for (const prop in propsCopy) {
        if (Array.isArray(propsCopy[prop])) {
            propsCopy[prop] = (propsCopy[prop] as Array<unknown>).map(item => {
                return convertToPlainObject(item);
            });
        }
        propsCopy[prop] = convertToPlainObject(propsCopy[prop]);
    }

    return propsCopy;
}
