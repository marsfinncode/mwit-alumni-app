.class public Lcom/moust/cordova/videoplayer/VideoPlayer;
.super Lorg/apache/cordova/CordovaPlugin;
.source "VideoPlayer.java"

# interfaces
.implements Landroid/media/MediaPlayer$OnCompletionListener;
.implements Landroid/media/MediaPlayer$OnPreparedListener;
.implements Landroid/media/MediaPlayer$OnErrorListener;
.implements Landroid/content/DialogInterface$OnDismissListener;


# static fields
.field protected static final ASSETS:Ljava/lang/String; = "/android_asset/"

.field protected static final LOG_TAG:Ljava/lang/String; = "VideoPlayer"


# instance fields
.field private callbackContext:Lorg/apache/cordova/CallbackContext;

.field private dialog:Landroid/app/Dialog;

.field private player:Landroid/media/MediaPlayer;

.field private videoView:Landroid/widget/VideoView;


# direct methods
.method public constructor <init>()V
    .locals 1

    .prologue
    .line 32
    invoke-direct {p0}, Lorg/apache/cordova/CordovaPlugin;-><init>()V

    .line 38
    const/4 v0, 0x0

    iput-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    return-void
.end method

.method static synthetic access$000(Lcom/moust/cordova/videoplayer/VideoPlayer;)Landroid/media/MediaPlayer;
    .locals 1
    .param p0, "x0"    # Lcom/moust/cordova/videoplayer/VideoPlayer;

    .prologue
    .line 32
    iget-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    return-object v0
.end method

.method static synthetic access$100(Lcom/moust/cordova/videoplayer/VideoPlayer;)Lorg/apache/cordova/CallbackContext;
    .locals 1
    .param p0, "x0"    # Lcom/moust/cordova/videoplayer/VideoPlayer;

    .prologue
    .line 32
    iget-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    return-object v0
.end method

.method static synthetic access$102(Lcom/moust/cordova/videoplayer/VideoPlayer;Lorg/apache/cordova/CallbackContext;)Lorg/apache/cordova/CallbackContext;
    .locals 0
    .param p0, "x0"    # Lcom/moust/cordova/videoplayer/VideoPlayer;
    .param p1, "x1"    # Lorg/apache/cordova/CallbackContext;

    .prologue
    .line 32
    iput-object p1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    return-object p1
.end method

.method public static stripFileProtocol(Ljava/lang/String;)Ljava/lang/String;
    .locals 1
    .param p0, "uriString"    # Ljava/lang/String;

    .prologue
    .line 118
    const-string v0, "file://"

    invoke-virtual {p0, v0}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v0

    if-eqz v0, :cond_0

    .line 119
    invoke-static {p0}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object v0

    invoke-virtual {v0}, Landroid/net/Uri;->getPath()Ljava/lang/String;

    move-result-object p0

    .line 121
    .end local p0    # "uriString":Ljava/lang/String;
    :cond_0
    return-object p0
.end method


# virtual methods
.method public execute(Ljava/lang/String;Lorg/apache/cordova/CordovaArgs;Lorg/apache/cordova/CallbackContext;)Z
    .locals 12
    .param p1, "action"    # Ljava/lang/String;
    .param p2, "args"    # Lorg/apache/cordova/CordovaArgs;
    .param p3, "callbackContext"    # Lorg/apache/cordova/CallbackContext;
    .annotation system Ldalvik/annotation/Throws;
        value = {
            Lorg/json/JSONException;
        }
    .end annotation

    .prologue
    const/4 v10, 0x0

    const/4 v9, 0x1

    .line 55
    const-string v11, "play"

    invoke-virtual {p1, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v11

    if-eqz v11, :cond_1

    .line 56
    iput-object p3, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    .line 58
    iget-object v11, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->webView:Lorg/apache/cordova/CordovaWebView;

    invoke-interface {v11}, Lorg/apache/cordova/CordovaWebView;->getResourceApi()Lorg/apache/cordova/CordovaResourceApi;

    move-result-object v5

    .line 59
    .local v5, "resourceApi":Lorg/apache/cordova/CordovaResourceApi;
    invoke-virtual {p2, v10}, Lorg/apache/cordova/CordovaArgs;->getString(I)Ljava/lang/String;

    move-result-object v7

    .line 60
    .local v7, "target":Ljava/lang/String;
    invoke-virtual {p2, v9}, Lorg/apache/cordova/CordovaArgs;->getJSONObject(I)Lorg/json/JSONObject;

    move-result-object v2

    .line 64
    .local v2, "options":Lorg/json/JSONObject;
    :try_start_0
    invoke-static {v7}, Landroid/net/Uri;->parse(Ljava/lang/String;)Landroid/net/Uri;

    move-result-object v10

    invoke-virtual {v5, v10}, Lorg/apache/cordova/CordovaResourceApi;->remapUri(Landroid/net/Uri;)Landroid/net/Uri;

    move-result-object v8

    .line 65
    .local v8, "targetUri":Landroid/net/Uri;
    invoke-virtual {v8}, Landroid/net/Uri;->toString()Ljava/lang/String;
    :try_end_0
    .catch Ljava/lang/IllegalArgumentException; {:try_start_0 .. :try_end_0} :catch_0

    move-result-object v1

    .line 70
    .end local v8    # "targetUri":Landroid/net/Uri;
    .local v1, "fileUriStr":Ljava/lang/String;
    :goto_0
    const-string v10, "VideoPlayer"

    invoke-static {v10, v1}, Landroid/util/Log;->v(Ljava/lang/String;Ljava/lang/String;)I

    .line 72
    invoke-static {v1}, Lcom/moust/cordova/videoplayer/VideoPlayer;->stripFileProtocol(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v3

    .line 75
    .local v3, "path":Ljava/lang/String;
    iget-object v10, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v10}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v10

    new-instance v11, Lcom/moust/cordova/videoplayer/VideoPlayer$1;

    invoke-direct {v11, p0, v3, v2}, Lcom/moust/cordova/videoplayer/VideoPlayer$1;-><init>(Lcom/moust/cordova/videoplayer/VideoPlayer;Ljava/lang/String;Lorg/json/JSONObject;)V

    invoke-virtual {v10, v11}, Landroid/app/Activity;->runOnUiThread(Ljava/lang/Runnable;)V

    .line 82
    new-instance v4, Lorg/apache/cordova/PluginResult;

    sget-object v10, Lorg/apache/cordova/PluginResult$Status;->NO_RESULT:Lorg/apache/cordova/PluginResult$Status;

    invoke-direct {v4, v10}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;)V

    .line 83
    .local v4, "pluginResult":Lorg/apache/cordova/PluginResult;
    invoke-virtual {v4, v9}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 84
    invoke-virtual {p3, v4}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 85
    const/4 p3, 0x0

    .line 107
    .end local v1    # "fileUriStr":Ljava/lang/String;
    .end local v2    # "options":Lorg/json/JSONObject;
    .end local v3    # "path":Ljava/lang/String;
    .end local v4    # "pluginResult":Lorg/apache/cordova/PluginResult;
    .end local v5    # "resourceApi":Lorg/apache/cordova/CordovaResourceApi;
    .end local v7    # "target":Ljava/lang/String;
    :cond_0
    :goto_1
    return v9

    .line 66
    .restart local v2    # "options":Lorg/json/JSONObject;
    .restart local v5    # "resourceApi":Lorg/apache/cordova/CordovaResourceApi;
    .restart local v7    # "target":Ljava/lang/String;
    :catch_0
    move-exception v0

    .line 67
    .local v0, "e":Ljava/lang/IllegalArgumentException;
    move-object v1, v7

    .restart local v1    # "fileUriStr":Ljava/lang/String;
    goto :goto_0

    .line 89
    .end local v0    # "e":Ljava/lang/IllegalArgumentException;
    .end local v1    # "fileUriStr":Ljava/lang/String;
    .end local v2    # "options":Lorg/json/JSONObject;
    .end local v5    # "resourceApi":Lorg/apache/cordova/CordovaResourceApi;
    .end local v7    # "target":Ljava/lang/String;
    :cond_1
    const-string v11, "close"

    invoke-virtual {p1, v11}, Ljava/lang/String;->equals(Ljava/lang/Object;)Z

    move-result v11

    if-eqz v11, :cond_4

    .line 90
    iget-object v11, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    if-eqz v11, :cond_3

    .line 91
    iget-object v11, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    invoke-virtual {v11}, Landroid/media/MediaPlayer;->isPlaying()Z

    move-result v11

    if-eqz v11, :cond_2

    .line 92
    iget-object v11, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    invoke-virtual {v11}, Landroid/media/MediaPlayer;->stop()V

    .line 94
    :cond_2
    iget-object v11, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    invoke-virtual {v11}, Landroid/media/MediaPlayer;->release()V

    .line 95
    iget-object v11, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v11}, Landroid/app/Dialog;->dismiss()V

    .line 98
    :cond_3
    if-eqz p3, :cond_0

    .line 99
    new-instance v6, Lorg/apache/cordova/PluginResult;

    sget-object v11, Lorg/apache/cordova/PluginResult$Status;->OK:Lorg/apache/cordova/PluginResult$Status;

    invoke-direct {v6, v11}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;)V

    .line 100
    .local v6, "result":Lorg/apache/cordova/PluginResult;
    invoke-virtual {v6, v10}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 101
    invoke-virtual {p3, v6}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 102
    const/4 p3, 0x0

    goto :goto_1

    .end local v6    # "result":Lorg/apache/cordova/PluginResult;
    :cond_4
    move v9, v10

    .line 107
    goto :goto_1
.end method

.method public onCompletion(Landroid/media/MediaPlayer;)V
    .locals 2
    .param p1, "mp"    # Landroid/media/MediaPlayer;

    .prologue
    .line 261
    const-string v0, "VideoPlayer"

    const-string v1, "MediaPlayer completed"

    invoke-static {v0, v1}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I

    .line 262
    invoke-virtual {p1}, Landroid/media/MediaPlayer;->release()V

    .line 263
    iget-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v0}, Landroid/app/Dialog;->dismiss()V

    .line 264
    return-void
.end method

.method public onDismiss(Landroid/content/DialogInterface;)V
    .locals 3
    .param p1, "dialog"    # Landroid/content/DialogInterface;

    .prologue
    .line 268
    const-string v1, "VideoPlayer"

    const-string v2, "Dialog dismissed"

    invoke-static {v1, v2}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I

    .line 269
    iget-object v1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    if-eqz v1, :cond_0

    .line 270
    new-instance v0, Lorg/apache/cordova/PluginResult;

    sget-object v1, Lorg/apache/cordova/PluginResult$Status;->OK:Lorg/apache/cordova/PluginResult$Status;

    invoke-direct {v0, v1}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;)V

    .line 271
    .local v0, "result":Lorg/apache/cordova/PluginResult;
    const/4 v1, 0x0

    invoke-virtual {v0, v1}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 272
    iget-object v1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    invoke-virtual {v1, v0}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 273
    const/4 v1, 0x0

    iput-object v1, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    .line 275
    .end local v0    # "result":Lorg/apache/cordova/PluginResult;
    :cond_0
    return-void
.end method

.method public onError(Landroid/media/MediaPlayer;II)Z
    .locals 3
    .param p1, "mp"    # Landroid/media/MediaPlayer;
    .param p2, "what"    # I
    .param p3, "extra"    # I

    .prologue
    .line 245
    const-string v0, "VideoPlayer"

    new-instance v1, Ljava/lang/StringBuilder;

    invoke-direct {v1}, Ljava/lang/StringBuilder;-><init>()V

    const-string v2, "MediaPlayer.onError("

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1, p2}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v1

    const-string v2, ", "

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1, p3}, Ljava/lang/StringBuilder;->append(I)Ljava/lang/StringBuilder;

    move-result-object v1

    const-string v2, ")"

    invoke-virtual {v1, v2}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v1

    invoke-virtual {v1}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v1

    invoke-static {v0, v1}, Landroid/util/Log;->e(Ljava/lang/String;Ljava/lang/String;)I

    .line 246
    invoke-virtual {p1}, Landroid/media/MediaPlayer;->isPlaying()Z

    move-result v0

    if-eqz v0, :cond_0

    .line 247
    invoke-virtual {p1}, Landroid/media/MediaPlayer;->stop()V

    .line 249
    :cond_0
    invoke-virtual {p1}, Landroid/media/MediaPlayer;->release()V

    .line 250
    iget-object v0, p0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v0}, Landroid/app/Dialog;->dismiss()V

    .line 251
    const/4 v0, 0x0

    return v0
.end method

.method public onPrepared(Landroid/media/MediaPlayer;)V
    .locals 0
    .param p1, "mp"    # Landroid/media/MediaPlayer;

    .prologue
    .line 256
    invoke-virtual {p1}, Landroid/media/MediaPlayer;->start()V

    .line 257
    return-void
.end method

.method protected openVideoDialog(Ljava/lang/String;Lorg/json/JSONObject;)V
    .locals 17
    .param p1, "path"    # Ljava/lang/String;
    .param p2, "options"    # Lorg/json/JSONObject;
    .annotation build Landroid/annotation/TargetApi;
        value = 0x10
    .end annotation

    .prologue
    .line 127
    new-instance v2, Landroid/app/Dialog;

    move-object/from16 v0, p0

    iget-object v3, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v3}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v3

    const v4, 0x1030006

    invoke-direct {v2, v3, v4}, Landroid/app/Dialog;-><init>(Landroid/content/Context;I)V

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    .line 128
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    invoke-virtual {v2}, Landroid/view/Window;->getAttributes()Landroid/view/WindowManager$LayoutParams;

    move-result-object v2

    const v3, 0x1030002

    iput v3, v2, Landroid/view/WindowManager$LayoutParams;->windowAnimations:I

    .line 129
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    const/4 v3, 0x1

    invoke-virtual {v2, v3}, Landroid/app/Dialog;->requestWindowFeature(I)Z

    .line 130
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    const/4 v3, 0x1

    invoke-virtual {v2, v3}, Landroid/app/Dialog;->setCancelable(Z)V

    .line 131
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    move-object/from16 v0, p0

    invoke-virtual {v2, v0}, Landroid/app/Dialog;->setOnDismissListener(Landroid/content/DialogInterface$OnDismissListener;)V

    .line 134
    new-instance v13, Landroid/widget/LinearLayout;

    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v2}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v2

    invoke-direct {v13, v2}, Landroid/widget/LinearLayout;-><init>(Landroid/content/Context;)V

    .line 135
    .local v13, "main":Landroid/widget/LinearLayout;
    new-instance v2, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v3, -0x1

    const/4 v4, -0x1

    invoke-direct {v2, v3, v4}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v13, v2}, Landroid/widget/LinearLayout;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 136
    const/4 v2, 0x1

    invoke-virtual {v13, v2}, Landroid/widget/LinearLayout;->setOrientation(I)V

    .line 137
    const/4 v2, 0x1

    invoke-virtual {v13, v2}, Landroid/widget/LinearLayout;->setHorizontalGravity(I)V

    .line 138
    const/16 v2, 0x10

    invoke-virtual {v13, v2}, Landroid/widget/LinearLayout;->setVerticalGravity(I)V

    .line 140
    new-instance v2, Landroid/widget/VideoView;

    move-object/from16 v0, p0

    iget-object v3, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v3}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v3

    invoke-direct {v2, v3}, Landroid/widget/VideoView;-><init>(Landroid/content/Context;)V

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->videoView:Landroid/widget/VideoView;

    .line 141
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->videoView:Landroid/widget/VideoView;

    new-instance v3, Landroid/widget/LinearLayout$LayoutParams;

    const/4 v4, -0x1

    const/4 v5, -0x1

    invoke-direct {v3, v4, v5}, Landroid/widget/LinearLayout$LayoutParams;-><init>(II)V

    invoke-virtual {v2, v3}, Landroid/widget/VideoView;->setLayoutParams(Landroid/view/ViewGroup$LayoutParams;)V

    .line 144
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->videoView:Landroid/widget/VideoView;

    invoke-virtual {v13, v2}, Landroid/widget/LinearLayout;->addView(Landroid/view/View;)V

    .line 146
    new-instance v2, Landroid/media/MediaPlayer;

    invoke-direct {v2}, Landroid/media/MediaPlayer;-><init>()V

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    .line 147
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    move-object/from16 v0, p0

    invoke-virtual {v2, v0}, Landroid/media/MediaPlayer;->setOnPreparedListener(Landroid/media/MediaPlayer$OnPreparedListener;)V

    .line 148
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    move-object/from16 v0, p0

    invoke-virtual {v2, v0}, Landroid/media/MediaPlayer;->setOnCompletionListener(Landroid/media/MediaPlayer$OnCompletionListener;)V

    .line 149
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    move-object/from16 v0, p0

    invoke-virtual {v2, v0}, Landroid/media/MediaPlayer;->setOnErrorListener(Landroid/media/MediaPlayer$OnErrorListener;)V

    .line 151
    const-string v2, "/android_asset/"

    move-object/from16 v0, p1

    invoke-virtual {v0, v2}, Ljava/lang/String;->startsWith(Ljava/lang/String;)Z

    move-result v2

    if-eqz v2, :cond_1

    .line 152
    const/16 v2, 0xf

    move-object/from16 v0, p1

    invoke-virtual {v0, v2}, Ljava/lang/String;->substring(I)Ljava/lang/String;

    move-result-object v9

    .line 153
    .local v9, "f":Ljava/lang/String;
    const/4 v10, 0x0

    .line 155
    .local v10, "fd":Landroid/content/res/AssetFileDescriptor;
    :try_start_0
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->cordova:Lorg/apache/cordova/CordovaInterface;

    invoke-interface {v2}, Lorg/apache/cordova/CordovaInterface;->getActivity()Landroid/app/Activity;

    move-result-object v2

    invoke-virtual {v2}, Landroid/app/Activity;->getAssets()Landroid/content/res/AssetManager;

    move-result-object v2

    invoke-virtual {v2, v9}, Landroid/content/res/AssetManager;->openFd(Ljava/lang/String;)Landroid/content/res/AssetFileDescriptor;

    move-result-object v10

    .line 156
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    invoke-virtual {v10}, Landroid/content/res/AssetFileDescriptor;->getFileDescriptor()Ljava/io/FileDescriptor;

    move-result-object v3

    invoke-virtual {v10}, Landroid/content/res/AssetFileDescriptor;->getStartOffset()J

    move-result-wide v4

    invoke-virtual {v10}, Landroid/content/res/AssetFileDescriptor;->getLength()J

    move-result-wide v6

    invoke-virtual/range {v2 .. v7}, Landroid/media/MediaPlayer;->setDataSource(Ljava/io/FileDescriptor;JJ)V
    :try_end_0
    .catch Ljava/lang/Exception; {:try_start_0 .. :try_end_0} :catch_0

    .line 178
    .end local v9    # "f":Ljava/lang/String;
    .end local v10    # "fd":Landroid/content/res/AssetFileDescriptor;
    :goto_0
    :try_start_1
    const-string v2, "volume"

    move-object/from16 v0, p2

    invoke-virtual {v0, v2}, Lorg/json/JSONObject;->getString(Ljava/lang/String;)Ljava/lang/String;

    move-result-object v2

    invoke-static {v2}, Ljava/lang/Float;->valueOf(Ljava/lang/String;)Ljava/lang/Float;

    move-result-object v2

    invoke-virtual {v2}, Ljava/lang/Float;->floatValue()F

    move-result v16

    .line 179
    .local v16, "volume":F
    const-string v2, "VideoPlayer"

    new-instance v3, Ljava/lang/StringBuilder;

    invoke-direct {v3}, Ljava/lang/StringBuilder;-><init>()V

    const-string v4, "setVolume: "

    invoke-virtual {v3, v4}, Ljava/lang/StringBuilder;->append(Ljava/lang/String;)Ljava/lang/StringBuilder;

    move-result-object v3

    move/from16 v0, v16

    invoke-virtual {v3, v0}, Ljava/lang/StringBuilder;->append(F)Ljava/lang/StringBuilder;

    move-result-object v3

    invoke-virtual {v3}, Ljava/lang/StringBuilder;->toString()Ljava/lang/String;

    move-result-object v3

    invoke-static {v2, v3}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I

    .line 180
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    move/from16 v0, v16

    move/from16 v1, v16

    invoke-virtual {v2, v0, v1}, Landroid/media/MediaPlayer;->setVolume(FF)V
    :try_end_1
    .catch Ljava/lang/Exception; {:try_start_1 .. :try_end_1} :catch_2

    .line 189
    sget v2, Landroid/os/Build$VERSION;->SDK_INT:I

    const/16 v3, 0x10

    if-lt v2, v3, :cond_0

    .line 191
    :try_start_2
    const-string v2, "scalingMode"

    move-object/from16 v0, p2

    invoke-virtual {v0, v2}, Lorg/json/JSONObject;->getInt(Ljava/lang/String;)I

    move-result v15

    .line 192
    .local v15, "scalingMode":I
    packed-switch v15, :pswitch_data_0

    .line 198
    const-string v2, "VideoPlayer"

    const-string v3, "setVideoScalingMode VIDEO_SCALING_MODE_SCALE_TO_FIT"

    invoke-static {v2, v3}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I

    .line 199
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    const/4 v3, 0x1

    invoke-virtual {v2, v3}, Landroid/media/MediaPlayer;->setVideoScalingMode(I)V
    :try_end_2
    .catch Ljava/lang/Exception; {:try_start_2 .. :try_end_2} :catch_3

    .line 210
    .end local v15    # "scalingMode":I
    :cond_0
    :goto_1
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->videoView:Landroid/widget/VideoView;

    invoke-virtual {v2}, Landroid/widget/VideoView;->getHolder()Landroid/view/SurfaceHolder;

    move-result-object v12

    .line 211
    .local v12, "mHolder":Landroid/view/SurfaceHolder;
    const/4 v2, 0x1

    invoke-interface {v12, v2}, Landroid/view/SurfaceHolder;->setKeepScreenOn(Z)V

    .line 212
    new-instance v2, Lcom/moust/cordova/videoplayer/VideoPlayer$2;

    move-object/from16 v0, p0

    invoke-direct {v2, v0}, Lcom/moust/cordova/videoplayer/VideoPlayer$2;-><init>(Lcom/moust/cordova/videoplayer/VideoPlayer;)V

    invoke-interface {v12, v2}, Landroid/view/SurfaceHolder;->addCallback(Landroid/view/SurfaceHolder$Callback;)V

    .line 233
    new-instance v11, Landroid/view/WindowManager$LayoutParams;

    invoke-direct {v11}, Landroid/view/WindowManager$LayoutParams;-><init>()V

    .line 234
    .local v11, "lp":Landroid/view/WindowManager$LayoutParams;
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    invoke-virtual {v2}, Landroid/view/Window;->getAttributes()Landroid/view/WindowManager$LayoutParams;

    move-result-object v2

    invoke-virtual {v11, v2}, Landroid/view/WindowManager$LayoutParams;->copyFrom(Landroid/view/WindowManager$LayoutParams;)I

    .line 235
    const/4 v2, -0x1

    iput v2, v11, Landroid/view/WindowManager$LayoutParams;->width:I

    .line 236
    const/4 v2, -0x1

    iput v2, v11, Landroid/view/WindowManager$LayoutParams;->height:I

    .line 238
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2, v13}, Landroid/app/Dialog;->setContentView(Landroid/view/View;)V

    .line 239
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->show()V

    .line 240
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->dialog:Landroid/app/Dialog;

    invoke-virtual {v2}, Landroid/app/Dialog;->getWindow()Landroid/view/Window;

    move-result-object v2

    invoke-virtual {v2, v11}, Landroid/view/Window;->setAttributes(Landroid/view/WindowManager$LayoutParams;)V

    .line 241
    .end local v11    # "lp":Landroid/view/WindowManager$LayoutParams;
    .end local v12    # "mHolder":Landroid/view/SurfaceHolder;
    .end local v16    # "volume":F
    :goto_2
    return-void

    .line 157
    .restart local v9    # "f":Ljava/lang/String;
    .restart local v10    # "fd":Landroid/content/res/AssetFileDescriptor;
    :catch_0
    move-exception v8

    .line 158
    .local v8, "e":Ljava/lang/Exception;
    new-instance v14, Lorg/apache/cordova/PluginResult;

    sget-object v2, Lorg/apache/cordova/PluginResult$Status;->ERROR:Lorg/apache/cordova/PluginResult$Status;

    invoke-virtual {v8}, Ljava/lang/Exception;->getLocalizedMessage()Ljava/lang/String;

    move-result-object v3

    invoke-direct {v14, v2, v3}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;Ljava/lang/String;)V

    .line 159
    .local v14, "result":Lorg/apache/cordova/PluginResult;
    const/4 v2, 0x0

    invoke-virtual {v14, v2}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 160
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    invoke-virtual {v2, v14}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 161
    const/4 v2, 0x0

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    goto :goto_2

    .line 167
    .end local v8    # "e":Ljava/lang/Exception;
    .end local v9    # "f":Ljava/lang/String;
    .end local v10    # "fd":Landroid/content/res/AssetFileDescriptor;
    .end local v14    # "result":Lorg/apache/cordova/PluginResult;
    :cond_1
    :try_start_3
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    move-object/from16 v0, p1

    invoke-virtual {v2, v0}, Landroid/media/MediaPlayer;->setDataSource(Ljava/lang/String;)V
    :try_end_3
    .catch Ljava/lang/Exception; {:try_start_3 .. :try_end_3} :catch_1

    goto/16 :goto_0

    .line 168
    :catch_1
    move-exception v8

    .line 169
    .restart local v8    # "e":Ljava/lang/Exception;
    new-instance v14, Lorg/apache/cordova/PluginResult;

    sget-object v2, Lorg/apache/cordova/PluginResult$Status;->ERROR:Lorg/apache/cordova/PluginResult$Status;

    invoke-virtual {v8}, Ljava/lang/Exception;->getLocalizedMessage()Ljava/lang/String;

    move-result-object v3

    invoke-direct {v14, v2, v3}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;Ljava/lang/String;)V

    .line 170
    .restart local v14    # "result":Lorg/apache/cordova/PluginResult;
    const/4 v2, 0x0

    invoke-virtual {v14, v2}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 171
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    invoke-virtual {v2, v14}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 172
    const/4 v2, 0x0

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    goto :goto_2

    .line 181
    .end local v8    # "e":Ljava/lang/Exception;
    .end local v14    # "result":Lorg/apache/cordova/PluginResult;
    :catch_2
    move-exception v8

    .line 182
    .restart local v8    # "e":Ljava/lang/Exception;
    new-instance v14, Lorg/apache/cordova/PluginResult;

    sget-object v2, Lorg/apache/cordova/PluginResult$Status;->ERROR:Lorg/apache/cordova/PluginResult$Status;

    invoke-virtual {v8}, Ljava/lang/Exception;->getLocalizedMessage()Ljava/lang/String;

    move-result-object v3

    invoke-direct {v14, v2, v3}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;Ljava/lang/String;)V

    .line 183
    .restart local v14    # "result":Lorg/apache/cordova/PluginResult;
    const/4 v2, 0x0

    invoke-virtual {v14, v2}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 184
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    invoke-virtual {v2, v14}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 185
    const/4 v2, 0x0

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    goto :goto_2

    .line 194
    .end local v8    # "e":Ljava/lang/Exception;
    .end local v14    # "result":Lorg/apache/cordova/PluginResult;
    .restart local v15    # "scalingMode":I
    .restart local v16    # "volume":F
    :pswitch_0
    :try_start_4
    const-string v2, "VideoPlayer"

    const-string v3, "setVideoScalingMode VIDEO_SCALING_MODE_SCALE_TO_FIT_WITH_CROPPING"

    invoke-static {v2, v3}, Landroid/util/Log;->d(Ljava/lang/String;Ljava/lang/String;)I

    .line 195
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->player:Landroid/media/MediaPlayer;

    const/4 v3, 0x2

    invoke-virtual {v2, v3}, Landroid/media/MediaPlayer;->setVideoScalingMode(I)V
    :try_end_4
    .catch Ljava/lang/Exception; {:try_start_4 .. :try_end_4} :catch_3

    goto/16 :goto_1

    .line 201
    .end local v15    # "scalingMode":I
    :catch_3
    move-exception v8

    .line 202
    .restart local v8    # "e":Ljava/lang/Exception;
    new-instance v14, Lorg/apache/cordova/PluginResult;

    sget-object v2, Lorg/apache/cordova/PluginResult$Status;->ERROR:Lorg/apache/cordova/PluginResult$Status;

    invoke-virtual {v8}, Ljava/lang/Exception;->getLocalizedMessage()Ljava/lang/String;

    move-result-object v3

    invoke-direct {v14, v2, v3}, Lorg/apache/cordova/PluginResult;-><init>(Lorg/apache/cordova/PluginResult$Status;Ljava/lang/String;)V

    .line 203
    .restart local v14    # "result":Lorg/apache/cordova/PluginResult;
    const/4 v2, 0x0

    invoke-virtual {v14, v2}, Lorg/apache/cordova/PluginResult;->setKeepCallback(Z)V

    .line 204
    move-object/from16 v0, p0

    iget-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    invoke-virtual {v2, v14}, Lorg/apache/cordova/CallbackContext;->sendPluginResult(Lorg/apache/cordova/PluginResult;)V

    .line 205
    const/4 v2, 0x0

    move-object/from16 v0, p0

    iput-object v2, v0, Lcom/moust/cordova/videoplayer/VideoPlayer;->callbackContext:Lorg/apache/cordova/CallbackContext;

    goto/16 :goto_2

    .line 192
    :pswitch_data_0
    .packed-switch 0x2
        :pswitch_0
    .end packed-switch
.end method
