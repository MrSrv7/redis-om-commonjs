const { Client } = require("redis-om");

const notFound = (data = "data") => `No ${data} found`;

const cacheInstance = async (schema) => {
  const client = await new Client().open();
  const cacheRepository = client.fetchRepository(schema);
  await cacheRepository.createIndex();
  return {
    client,
    repository: cacheRepository,
  };
};

const getAllCachedData = async ({ cacheObject, cacheName }) => {
  try {
    const cachedRepository = (await cacheObject()).repository;
    const cachedResults = await cachedRepository.search().returnAll();

    if (!cachedResults.length) {
      return { message: notFound(cacheName) };
    }

    return cachedResults;
  } catch (error) {
    console.log("getAllCachedData error", error);
    throw new Error(error);
  }
};

const getCachedResultById = async ({ cacheObject, cacheName, id }) => {
  try {
    const cachedRepository = (await cacheObject()).repository;

    const dataExists = Boolean(
      await (await cacheObject()).client.execute(["EXISTS", `Song:${id}`])
    );

    if (dataExists) {
      return cachedRepository.fetch(id);
    }

    return { message: notFound(cacheName) };
  } catch (error) {
    console.log("getCachedResultById error", error);
    throw new Error(error);
  }
};

const addDataToCache = async ({ cacheObject, cacheName = "data", payload }) => {
  try {
    const cachedRepository = (await cacheObject()).repository;
    const cachedEntity = cachedRepository.createEntity();
    for (const key in payload) {
      if (Object.prototype.hasOwnProperty.call(payload, key)) {
        cachedEntity[key] = payload[key] ?? null;
      }
    }
    const id = await cachedRepository.save(cachedEntity);
    return { message: `${cacheName} Added Successfully`, id };
  } catch (error) {
    console.log("addDataToCache error", error);
    throw new Error(error);
  }
};

const editDataInCache = async ({
  cacheObject,
  cacheName = "data",
  id,
  payload,
}) => {
  try {
    const cachedRepository = (await cacheObject()).repository;
    const dataExists = Boolean(
      await (await cacheObject()).client.execute(["EXISTS", `Song:${id}`])
    );
    if (dataExists) {
      const cachedEntity = await cachedRepository.fetch(id);
      for (const key in payload) {
        if (Object.prototype.hasOwnProperty.call(payload, key)) {
          cachedEntity[key] = payload[key] ?? cachedEntity[key];
        }
        await cachedRepository.save(cachedEntity);
        return { message: `${cacheName} updated successfully` };
      }
    }
    return { message: notFound(cacheName) };
  } catch (error) {
    console.log("editDataInCache error", error);
    throw new Error(error);
  }
};

const deleteDataInCache = async ({ cacheObject, cacheName, id }) => {
  try {
    const cachedRepository = (await cacheObject()).repository;
    const dataExists = Boolean(
      await (await cacheObject()).client.execute(["EXISTS", `Song:${id}`])
    );
    if (dataExists) {
      await cachedRepository.remove(id);
      return { message: `${cacheName} deleted successfully` };
    }
    return { message: notFound(cacheName) };
  } catch (error) {
    console.log("deleteDataInCache error", error);
    throw new Error(error);
  }
};

module.exports = {
  cacheInstance,
  getAllCachedData,
  getCachedResultById,
  addDataToCache,
  editDataInCache,
  deleteDataInCache
};
