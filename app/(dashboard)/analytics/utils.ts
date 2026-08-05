import {
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from "date-fns";

export function formatBytes(
  bytes: number,
) {
  if (bytes < 1024) {
    return `${bytes} B`;
  }

  if (bytes < 1024 * 1024) {
    return `${(
      bytes / 1024
    ).toFixed(1)} KB`;
  }

  if (bytes < 1024 * 1024 * 1024) {
    return `${(
      bytes /
      1024 /
      1024
    ).toFixed(2)} MB`;
  }

  return `${(
    bytes /
    1024 /
    1024 /
    1024
  ).toFixed(2)} GB`;
}

export function buildActivityData(
  chats: {
    createdAt: Date;
  }[],
) {
  const start =
    startOfWeek(new Date());

  const end =
    endOfWeek(new Date());

  const week =
    eachDayOfInterval({
      start,
      end,
    });

  return week.map((day) => ({
    day: format(day, "EEE"),

    chats: chats.filter(
      (chat) =>
        format(
          chat.createdAt,
          "yyyy-MM-dd",
        ) ===
        format(
          day,
          "yyyy-MM-dd",
        ),
    ).length,
  }));
}

export function buildModelUsage(
  models: {
    model: string | null;
  }[],
) {
  return Object.entries(
    models.reduce(
      (acc, { model }) => {
        if (!model) {
          return acc;
        }

        acc[model] =
          (acc[model] ?? 0) + 1;

        return acc;
      },
      {} as Record<
        string,
        number
      >,
    ),
  ).map(
    ([name, value]) => ({
      name,
      value,
    }),
  );
}

export function buildFileTypes(
  files: {
    type: string;
  }[],
) {
  return Object.entries(
    files.reduce(
      (acc, file) => {
        const type =
          file.type.toUpperCase();

        acc[type] =
          (acc[type] ?? 0) + 1;

        return acc;
      },
      {} as Record<
        string,
        number
      >,
    ),
  ).map(
    ([type, files]) => ({
      type,
      files,
    }),
  );
}