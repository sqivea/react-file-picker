/**
 * Util class for dealing with input errors.
 */
export class InputErrorCode {
  public static readonly NoErrors = 0x00;

  public static readonly MaxSizeExceeded = 0x01;

  public static readonly InappropriateExtension = 0x02;

  public static containsMaxSizeError = (errorsRepr: number) => (
    (errorsRepr & InputErrorCode.MaxSizeExceeded) !== 0
  );

  public static containsExtensionError = (errorsRepr: number) => (
    (errorsRepr & InputErrorCode.InappropriateExtension) !== 0
  );
}
