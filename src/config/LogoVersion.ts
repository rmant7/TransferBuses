export class LogoVersion {
  private logoName: string;
  private version: string;
  private developer: string;

  constructor(logoName: string, version: string, developer: string) {
    this.logoName = logoName;
    if (!version) {
      const date = new Date();
      this.version = `v.${date.getFullYear()}.${
        date.getMonth() + 1
      }.${date.getDate()}`;
    } else {
      this.version = version;
    }
    this.developer = developer;
  }

  getLogo() {
    return this.logoName;
  }

  setLogo(logoName: string) {
    this.logoName = logoName;
  }

  getVersion() {
    return this.version;
  }

  setVersion(version: string) {
    this.version = version;
  }

  getDeveloper() {
    return this.developer;
  }

  setDeveloper(developer: string) {
    this.developer = developer;
  }
}
