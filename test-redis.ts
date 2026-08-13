import "dotenv/config";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

async function test() {
  console.log("PING:", await redis.ping());

  console.log(
    "EVAL:",
    await redis.eval(
      "return 1",
      [],
      [],
    ),
  );
}

test().catch(console.error);