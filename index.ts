type fdk_ptr = number;

type HANDLE_AACDECODER = fdk_ptr;

const enum TRANSPORT_TYPE {
    TT_UNKNOWN = -1,
    TT_MP4_RAW = 0,
    TT_MP4_ADIF = 1,
    TT_MP4_ADTS = 2,
    TT_MP4_LATM_MCP1 = 6,
    TT_MP4_LATM_MCP0 = 7,
    TT_MP4_LOAS = 10,
    TT_DRM = 12
}

const enum AACDEC_PARAM {
    AAC_PCM_DUAL_CHANNEL_OUTPUT_MODE = 0x0002,
    AAC_PCM_OUTPUT_CHANNEL_MAPPING = 0x0003,
    AAC_PCM_LIMITER_ENABLE = 0x0004,
    AAC_PCM_LIMITER_ATTACK_TIME = 0x0005,
    AAC_PCM_LIMITER_RELEAS_TIME = 0x0006,
    AAC_PCM_MIN_OUTPUT_CHANNELS = 0x0011,
    AAC_PCM_MAX_OUTPUT_CHANNELS = 0x0012,
    AAC_METADATA_PROFILE = 0x0020,
    AAC_METADATA_EXPIRY_TIME = 0x0021,
    AAC_CONCEAL_METHOD = 0x0100,
    AAC_DRC_BOOST_FACTOR = 0x0200,
    AAC_DRC_ATTENUATION_FACTOR = 0x0201,
    AAC_DRC_REFERENCE_LEVEL = 0x0202,
    AAC_DRC_HEAVY_COMPRESSION = 0x0203,
    AAC_DRC_DEFAULT_PRESENTATION_MODE = 0x0204,
    AAC_DRC_ENC_TARGET_LEVEL = 0x0205,
    AAC_UNIDRC_SET_EFFECT = 0x0206,
    AAC_UNIDRC_ALBUM_MODE = 0x0207,
    AAC_QMF_LOWPOWER = 0x0300,
    AAC_TPDEC_CLEAR_BUFFER = 0x0603
}

const enum AAC_DECODER_ERROR {
    AAC_DEC_OK = 0x0000,
    AAC_DEC_OUT_OF_MEMORY = 0x0002,
    AAC_DEC_UNKNOWN = 0x0005,
    aac_dec_sync_error_start = 0x1000,
    AAC_DEC_TRANSPORT_SYNC_ERROR = 0x1001,
    AAC_DEC_NOT_ENOUGH_BITS = 0x1002,
    aac_dec_sync_error_end = 0x1FFF,
    aac_dec_init_error_start = 0x2000,
    AAC_DEC_INVALID_HANDLE = 0x2001,
    AAC_DEC_UNSUPPORTED_AOT = 0x2002,
    AAC_DEC_UNSUPPORTED_FORMAT = 0x2003,
    AAC_DEC_UNSUPPORTED_ER_FORMAT = 0x2004,
    AAC_DEC_UNSUPPORTED_EPCONFIG = 0x2005,
    AAC_DEC_UNSUPPORTED_MULTILAYER = 0x2006,
    AAC_DEC_UNSUPPORTED_CHANNELCONFIG = 0x2007,
    AAC_DEC_UNSUPPORTED_SAMPLINGRATE = 0x2008,
    AAC_DEC_INVALID_SBR_CONFIG = 0x2009,
    AAC_DEC_SET_PARAM_FAIL = 0x200A,
    AAC_DEC_NEED_TO_RESTART = 0x200B,
    AAC_DEC_OUTPUT_BUFFER_TOO_SMALL = 0x200C,
    aac_dec_init_error_end = 0x2FFF,
    aac_dec_decode_error_start = 0x4000,
    AAC_DEC_TRANSPORT_ERROR = 0x4001,
    AAC_DEC_PARSE_ERROR = 0x4002,
    AAC_DEC_UNSUPPORTED_EXTENSION_PAYLOAD = 0x4003,
    AAC_DEC_DECODE_FRAME_ERROR = 0x4004,
    AAC_DEC_CRC_ERROR = 0x4005,
    AAC_DEC_INVALID_CODE_BOOK = 0x4006,
    AAC_DEC_UNSUPPORTED_PREDICTION = 0x4007,
    AAC_DEC_UNSUPPORTED_CCE = 0x4008,
    AAC_DEC_UNSUPPORTED_LFE = 0x4009,
    AAC_DEC_UNSUPPORTED_GAIN_CONTROL_DATA = 0x400A,
    AAC_DEC_UNSUPPORTED_SBA = 0x400B,
    AAC_DEC_TNS_READ_ERROR = 0x400C,
    AAC_DEC_RVLC_ERROR = 0x400D,
    aac_dec_decode_error_end = 0x4FFF,
    aac_dec_anc_data_error_start = 0x8000,
    AAC_DEC_ANC_DATA_ERROR = 0x8001,
    AAC_DEC_TOO_SMALL_ANC_BUFFER = 0x8002,
    AAC_DEC_TOO_MANY_ANC_ELEMENTS = 0x8003,
    aac_dec_anc_data_error_end = 0x8FFF
}

declare interface Module {
    readonly HEAP8: Int8Array;
    readonly HEAP16: Int16Array;
    readonly HEAP32: Int32Array;
    readonly HEAPU8: Uint8Array;
    readonly HEAPU16: Uint16Array;
    readonly HEAPU32: Uint32Array;
    readonly HEAPF32: Float32Array;
    readonly HEAPF64: Float64Array;

    _malloc(__size: number): number;

    _calloc(__nmemb: number, __size: number): number;

    _free(__ptr: number): void;
}

declare interface AAC extends Module {

    _aacDecoder_Open(transportFmt: TRANSPORT_TYPE, nrOfLayers: number): HANDLE_AACDECODER;

    _aacDecoder_SetParam(self: HANDLE_AACDECODER, param: AACDEC_PARAM, value: number): AAC_DECODER_ERROR;

    _aacDecoder_Fill(self: HANDLE_AACDECODER, pBuffer: fdk_ptr, bufferSize: fdk_ptr, bytesValid: fdk_ptr): AAC_DECODER_ERROR;

    _aacDecoder_DecodeFrame(self: HANDLE_AACDECODER, pTimeData: fdk_ptr, timeDataSize: number, flags: number): AAC_DECODER_ERROR;

}