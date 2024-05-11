// ==================== Enum ====================
// 常量枚举
const enum Week {
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
  SUNDAY,
}
// 枚举项的值默认以 0 开始递增
console.log(Week.FRIDAY);

// 自定义值枚举
enum Status {
  TODO = 1,
  DOING = 2,
  DONE = 3,
  FINISHED = "OVER",
}
// 打印枚举的名称，而非枚举值
console.log(Status.TODO);
console.log(Status.FINISHED);
console.log(Status[Status.DOING]);

// keyof 应用在枚举上: 获取所有枚举项的名称
enum HttpMethod {
  GET,
  POST,
  PUT
}

let hme: keyof typeof HttpMethod // let hme: "GET" | "POST" | "PUT"

export {}