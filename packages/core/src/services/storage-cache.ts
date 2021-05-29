import { Cache } from './cache';
import { CacheInterface } from '../interfaces';
import { Singleton } from '../decorators';

@Singleton
export class StorageCache extends Cache implements CacheInterface {}
